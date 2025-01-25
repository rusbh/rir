# frozen_string_literal: true

class User < ApplicationRecord
  MIN_PASSWORD_ENTROPY = 14

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :trackable

  has_one_attached :avatar

  validates :name, length: { minimum: 2 }
  validates :email, presence: true, length: { maximum: 100 }
  validates :password,
            password_strength: {
              min_entropy: MIN_PASSWORD_ENTROPY,
              use_dictionary: true
            },
            allow_nil: true

  def email_domain
    _, domain = email.split("@")
    domain
  end

  def self.owner
    User.find_by(email: Owner.email)
  end

  def owner?
    email == Owner.email
  end

  def admin?
    email.in?(Admin.emails) || email_domain.in?(Admin.email_domains)
  end
end
