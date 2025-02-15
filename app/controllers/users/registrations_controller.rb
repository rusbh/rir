# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    ATTRIBUTES_REQUIRING_CURRING_PASSWORD = %i[email password].freeze

    before_action :configure_sign_up_params, only: :create

    # GET /sign_up
    def new
      render(inertia: "Signup")
    end

    # GET /account
    def edit
      render(inertia: "AccountPage")
    end

    # POST /signup
    def create
      resource = build_resource(sign_up_params)
      resource.skip_confirmation! if Rails.env.development? && resource.owner?
      if resource.save
        if resource.active_for_authentication?
          set_flash_message!(:notice, :signed_up)
          sign_up(resource_name, resource)
          redirect_to(after_sign_up_path_for(resource))
        else
          set_flash_message!(
            :notice,
            :"signed_up_but_#{resource.inactive_message}"
          )
          expire_data_after_sign_in!
          redirect_to(after_inactive_sign_up_path_for(resource))
        end
      else
        redirect_to(new_registration_path(resource_name), inertia: {
                      errors: resource.form_errors
                    })
      end
    end

    # PUT /account
    def update
      resource = self.resource = resource_class
                                 .to_adapter
                                 .get!(public_send(:"current_#{resource_name}").to_key)
      update_params = params.require(resource_name)
                            .permit(:name, :avatar)
      if update_resource(resource, update_params)
        resource_param = resource_name.to_s.camelize(:lower)
        render(json: {
                 resource_param => UserSerializer.one(resource)
               })
      else
        render(
          json: { errors: resource.form_errors },
          status: :unprocessable_entity
        )
      end
    end

    # POST /account/change_email
    def change_email
      resource = resource_class
                 .to_adapter
                 .get!(public_send(:"current_#{resource_name}").to_key)
      update_params = params.require(resource_name)
                            .permit(:email, :current_password)
      update_params[:unconfirmed_email] = nil if resource.email == update_params[:email]
      if resource.update_with_password(update_params)
        needs_confirmation = update_needs_confirmation?(resource, nil)
        resource_param = resource_name.to_s.camelize(:lower)
        render(json: {
                 resource_param => UserSerializer.one(resource),
                 "emailNeedsConfirmation" => needs_confirmation
               })
      else
        render(
          json: { errors: resource.form_errors },
          status: :unprocessable_entity
        )
      end
    end

    # POST /account/change_password
    def change_password
      resource = resource_class
                 .to_adapter
                 .get!(public_send(:"current_#{resource_name}").to_key)
      if resource.update_with_password(account_update_params)
        bypass_sign_in(resource, scope: resource_name) if sign_in_after_change_password?
        redirect_to(after_update_path_for(resource))
      else
        clean_up_passwords(resource)
        redirect_to(edit_registration_path(resource), inertia: {
                      errors: resource.form_errors
                    })
      end
    end

    # DELETE /resource
    # def destroy
    #   super
    # end

    # GET /resource/cancel
    # Forces the session data which is usually expired after sign
    # in to be expired now. This is useful if the user wants to
    # cancel oauth signing in/up in the middle of the process,
    # removing all OAuth session data.
    # def cancel
    #   super
    # end

    protected

    def update_resource(resource, params)
      requires_current_password = ATTRIBUTES_REQUIRING_CURRING_PASSWORD
                                  .any? { |attribute| params[attribute].present? }
      if requires_current_password
        resource.update_with_password(params)
      else
        resource.update_without_password(params)
      end
    end

    def after_update_path_for(resource)
      if sign_in_after_change_password?
        edit_registration_path(resource)
      else
        new_session_path(resource_name)
      end
    end

    private

    # If you have extra params to permit, append them to the sanitizer.
    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    end

    # # If you have extra params to permit, append them to the sanitizer.
    # def configure_account_update_params
    #   devise_parameter_sanitizer.permit(:account_update, keys: [:name])
    # end

    # The path used after sign up.
    # def after_sign_up_path_for(resource)
    #   super(resource)
    # end

    # The path used after sign up for inactive accounts.
    # def after_inactive_sign_up_path_for(resource)
    #   super(resource)
    # end
  end
end
