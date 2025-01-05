# frozen_string_literal: true

return unless Rails.env.development?

ADDITIONAL_CONTROLLERS = %w[users/sessions].freeze

JsFromRoutes.config do |config|
  config.file_suffix = "Routes.ts"
  config.output_folder = Rails.root.join("app/frontend/helpers/routes/generated")
  config.export_if = lambda { |route|
    export = route.defaults[:export]
    controller = route.requirements[:controller]
    export ||
      controller&.in?(ADDITIONAL_CONTROLLERS) ||
      controller&.start_with?("active_storage")
  }
end
