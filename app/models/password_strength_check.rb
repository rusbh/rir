# frozen_string_literal: true

class PasswordStrengthCheck
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :password, :string

  def password!
    password or raise "Missing password"
  end

  validates :password, presence: true
end
