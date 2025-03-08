# frozen_string_literal: true

module Admin
  class << self
    def emails
      credentials.emails || []
    end

    def email_domains
      credentials.email_domains || []
    end

    def credentials
      Rails.application.credentials.admin!
    end
  end
end
