# frozen_string_literal: true

Healthcheck.configure do |config|
  config.success = 200
  config.error = 503
  config.verbose = false
  config.route = '/status'
  config.method = :get

  # -- Custom Response --
  config.custom = lambda { |controller, checker|
    controller.render(json: {
                        status: HealthCheckSerializer.render(checker),
                        "bootedAt" => Rir::Application.booted_at
                      })
  }

  # -- Checks --
  config.add_check(:database, lambda do
    Rails.logger.silence do
      ActiveRecord::Base.connection.execute("select 1")
    end
  end)
  config.add_check(:migrations, lambda do
    Rails.logger.silence do
      ActiveRecord::Migration.check_all_pending!
    end
  end)
  config.add_check(:cache, -> { Rails.cache.read("some_key") })
  # config.add_check :environments, -> { Dotenv.require_keys('ENV_NAME', 'ANOTHER_ENV') }
end
