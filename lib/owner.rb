# frozen_string_literal: true

module Owner
  class << self
    def email
      credentials.email!
    end

    def credentials
      Rails.application.credentials.owner!
    end
  end
end
