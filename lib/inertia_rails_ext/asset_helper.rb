# frozen_string_literal: true

module InertiaRails
  module AssetHelper
    extend ActiveSupport::Concern

    def inertia_assets(page, type:, **)
      component = page.fetch(:component)
      raise "Invalid component: #{component}" unless component.is_a?(String)

      name = "#{component}.tsx"
      path = File.join(type.to_s.pluralize, name)
      vite_javascript_tag(path, **)
    end
  end
end
