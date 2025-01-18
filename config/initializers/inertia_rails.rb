# frozen_string_literal: true

InertiaRails.configure do |config|
  config.encrypt_history = Rails.env.production?
  unless Rails.env.development?
    config.ssr_enabled = ViteRuby.config.ssr_build_enabled
    config.version = ViteRuby.digest
  end
end
