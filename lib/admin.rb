# frozen_string_literal: true

module Admin
  def self.emails
    credentials.emails || []
  end

  def self.email_domains
    credentials.email_domains || []
  end

  def self.credentials
    Rails.application.credentials.admin!
  end
end
