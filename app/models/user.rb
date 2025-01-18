class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :trackable

  has_one_attached :avatar

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
