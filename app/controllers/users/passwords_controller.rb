# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    # GET /account/password/reset
    def new
      render(inertia: "RequestPasswordResetPage")
    end

    # GET /account/password/change?reset_password_token=abcdef
    def edit
      reset_password_token = params.fetch(:reset_password_token)
      render(
        inertia: "ChangePasswordPage",
        props: { "resetPasswordToken" => reset_password_token },
      )
    end

    # POST /account/password
    def create
      resource = self.resource = resource_class
        .send_reset_password_instructions(resource_params)
      if successfully_sent?(resource)
        render(json: {})
      else
        render(
          json: { errors: resource.form_errors },
          status: :unprocessable_entity,
        )
      end
    end

    # PUT /account/password
    def update
      resource = self.resource = resource_class
        .reset_password_by_token(resource_params)
      if resource.errors.empty?
        resource.unlock_access! if unlockable?(resource)
        if resource_class.sign_in_after_reset_password
          flash_message = if resource.active_for_authentication?
            :updated
          else
            :updated_not_active
          end
          set_flash_message!(:notice, flash_message)
          resource.after_database_authentication
          sign_in(resource_name, resource)
        else
          set_flash_message!(:notice, :updated_not_active)
        end
        render(json: { user: UserSerializer.one(resource) })
      else
        render(
          json: { errors: resource.form_errors },
          status: :unprocessable_entity,
        )
      end
    end

    # protected

    # def after_resetting_password_path_for(resource)
    #   super(resource)
    # end

    # The path used after sending reset password instructions
    # def after_sending_reset_password_instructions_path_for(resource_name)
    #   super(resource_name)
    # end
  end
end
