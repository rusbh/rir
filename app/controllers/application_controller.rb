# frozen_string_literal: true

class ApplicationController < ActionController::Base
  allow_browser versions: :modern

  include ActiveStorage::SetCurrent
  include RemembersUserLocation
  include Pagy::Backend
  include RendersJsonException

  around_action :with_error_context

  def authenticate_user!(opts = {})
    if (user = current_user)
      user
    elsif request.format.html?
      super
    else
      raise UnauthenticatedError
    end
  end

  inertia_share do
    {
      csrf: {
        param: request_forgery_protection_token,
        token: form_authenticity_token
      },
      flash: flash.to_h,
      "currentUser" => UserSerializer.one_if(current_user)
    }
  end

  rescue_from RuntimeError,
              ActiveRecord::RecordNotSaved,
              with: :report_and_render_json_exception
  rescue_from ActionPolicy::Unauthorized, with: :handle_unauthorized

  private

  def error_context
    case current_user
    in { id:, email: }
      { user_id: id, user_email: email }
    else
      {}
    end
  end

  def with_error_context(&)
    context = error_context.compact
    Rails.error.set_context(**context)
    yield
  end

  def render_unauthenticated_error(error)
    render(json: { error: error.message }, status: :unauthorized)
  end

  def report_and_render_json_exception(exception)
    report_exception(exception)
    render_json_exception(exception)
  end

  def report_exception(exception)
    Rails.error.report(exception)
  end

  def handle_unauthorized(error)
    if signed_in?
      raise unless request.format.json?

      report_and_render_json_exception(error)
    else
      authenticate_user!
    end
  end
end
