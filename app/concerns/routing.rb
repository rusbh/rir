# frozen_string_literal: true

module Routing
  extend ActiveSupport::Concern

  included do
    include Rails.application.routes.url_helpers
  end

  private

  def default_url_options
    Rails.application.default_url_options
  end
end
