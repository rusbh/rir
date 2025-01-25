# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: :default_sender, reply_to: :default_reply_to
  layout "mailer"

  protected

  def default_sender
    credentials.sender!
  end

  def default_reply_to
    credentials.reply_to
  end

  private

  def credentials
    Rails.application.credentials.mailer!
  end
end
