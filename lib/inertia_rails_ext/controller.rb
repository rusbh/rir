# frozen_string_literal: true

require "inertia_rails"
require_relative "asset_helper"

module InertiaRails
  module Controller
    extend ActiveSupport::Concern

    remove_instance_variable :@_included_block
    included do
      helper Helper
      helper AssetHelper
    end
  end
end
