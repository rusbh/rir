# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_action :authenticate_user!
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  # You should also create an action method in this controller like this:
  # def twitter
  # end

  # More info at:
  # https://github.com/heartcombo/devise#omniauth

  def google
    credentials = OAuthCredentials.find_or_initialize_by(
      auth.slice(:provider).to_h
    )
    credentials.update!(
      **auth.slice(:uid),
      **auth.fetch(:credentials).slice(:refresh_token)
    )
    scoped do
      credentials => { uid:, refresh_token: }
      logger.info(
        "Authenticated with Google (uid: #{uid}, refresh_token: " \
        "#{refresh_token})"
      )
    end
    set_flash_message(:notice, :success, kind: "Google") if is_navigational_format?
    redirect_to(admin_path)
    # response.set_header("Location", response.get_header("Location") + "#")
  end

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end

  private

  def auth
    request.env.fetch("omniauth.auth")
  end
end
