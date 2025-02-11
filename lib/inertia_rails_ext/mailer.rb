# frozen_string_literal: true

require "core_ext"
require "inertia_rails"
require_relative "asset_helper"

module InertiaRails
  module Mailer
    class Renderer < ::InertiaRails::Renderer
      def render = render_ssr
    end

    extend ActiveSupport::Concern
    public_send(:include, scoped do # rubocop:disable Style/SendWithLiteralMethodName
      controller = InertiaRails::Controller.clone
      controller.remove_instance_variable(:@_included_block)
      controller
    end)

    prepended do
      helper Helper
      helper AssetHelper
    end

    def mail(headers = {}, &)
      if headers.include?(:inertia)
        headers[:body] =
          inertia_render(headers[:inertia], **headers.slice(:props))
        headers[:content_type] = "text/html"
      end
      super
    end

    # == Inertia helpers
    def session = {}

    private

    def inertia_render(component, props: {})
      wait_for_inertia_ssr_ready
      request = ActionDispatch::Request.new({ "ORIGINAL_FULLPATH" => "/" })
      renderer = Renderer.new(
        component,
        self,
        request,
        nil,
        method(:render),
        props:,
        view_data: nil
      )
      ViteRuby.without_dev_server do
        ViteRuby.without_auto_build do
          renderer.render
        end
      end
    rescue StandardError => e
      raise "Failed to render email with Inertia: #{e}"
    end

    def wait_for_inertia_ssr_ready
      attempts = 0
      begin
        attempts += 1
        Faraday.head(InertiaRails.configuration.ssr_url)
      rescue Errno::ECONNREFUSED
        sleep(0.5)
        raise "Inertia SSR server cannot be reached" unless attempts < 6

        retry
      end
    end
  end
end
