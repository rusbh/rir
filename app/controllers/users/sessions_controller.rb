# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  before_action :store_redirect_location, only: :new

  # GET /login
  def new
    render(inertia: "Login", props: { failed: flash.alert.present? })
  end

  # POST /login
  def create
    resource = self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    inertia_location(after_sign_in_path_for(resource))
  end

  # DELETE /logout
  def destroy
    sign_out(resource)
    inertia_location(after_sign_out_path_for(resource_name))
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  private

  def store_redirect_location
    url = params[:redirect_url].presence or return
    raise "Redirect URL must be a string" unless url.is_a?(String)

    store_location_for(:user, url)
  end
end
