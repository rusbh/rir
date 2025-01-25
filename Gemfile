source "https://rubygems.org"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.2.2", ">= 7.2.2.1"
# Use postgresql as the database for Active Record
gem "pg", "~> 1.1"
# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Use Redis adapter to run Action Cable in production
# gem "redis", ">= 4.0.1"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"
gem "ruby-vips", "~> 2.2", require: false

gem "inertia_rails", "~> 3.6"
gem "vite_rails", "~> 3.0"

# Load environment variables from .env
gem "dotenv-rails", "~> 3.1"

# Auth
gem "devise", "~> 4.9"
gem "omniauth", "~> 2.1"
gem "omniauth-rails_csrf_protection", "~> 1.0"
gem "omniauth-google-oauth2", "~> 1.2"
gem "action_policy", "~> 0.7.2"

# Handle soft deletions with Discard
gem "discard", "~> 1.4"

# Pagination
gem "pagy", "~> 9.3"

# friendly urls
# gem "friendly_id", "~> 5.5"

# Serializer Helpers
gem "oj_serializers", "~> 2.0"
gem "types_from_serializers", "~> 2.3"

# Helpers
gem "amazing_print", "~> 1.6"
gem "js_from_routes", "~> 4.0"
gem "foreman", "~> 0.88.1"
gem "letter_opener", "~> 1.10"

# Rerun programs when files change
gem "rerun", "~> 0.14.0", require: false

# check password strength
gem "strong_password", "~> 0.0.10"

# healthcheck status
gem "rails-healthcheck", "~> 1.4"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem "brakeman", require: false

   # Fix N+1 queries
   gem "bullet", "~> 8.0"

   gem "rspec-rails", "~> 7.1"
   gem "factory_bot_rails", "~> 6.4"
   
   # Linting
   gem "rubocop-rails", "~> 2.27", require: false
   gem "rubocop-rspec", "~> 3.3", require: false
   gem "rubocop-performance", "~> 1.23", require: false
   gem "ruby-lsp", "~> 0.22.1", require: false
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
end

group :test do
  gem "database_cleaner-active_record", "~> 2.2"
  gem "shoulda-matchers", "~> 6.4"
end

