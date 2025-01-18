# frozen_string_literal: true

module Owner
  def self.email
    credentials.email!
  end

  def self.credentials
    Rails.application.credentials.owner!
  end
end
