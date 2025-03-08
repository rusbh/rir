require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Rir
  class Application < Rails::Application
    require "core_ext"
    require "custom_devise_failure_app"
    require "owner"
    require "admin"

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults(8.0)

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: ['assets', 'tasks'])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Don't generate helpers, views, assets or system test files.
    config.generators do |g|
      g.helper(false)
      g.system_tests(nil)
      g.template_engine(nil)
      g.assets(false)
    end

    config.session_store(:cookie_store, key: "_rir_session")

    config.exceptions_app = routes
    config.action_dispatch
      .rescue_responses["ActionPolicy::Unauthorized"] = :unauthorized

    config.action_controller.action_on_unpermitted_parameters = :raise

    config.active_storage.variant_processor = :vips
    config.active_storage.direct_uploads_size_limit = 25.megabytes
    config.active_storage.routes_prefix = "/storage"

    BOOTED_AT = Time.current

    def booted_at = BOOTED_AT
  end
end
