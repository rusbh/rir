# frozen_string_literal: true

module Users
  class ConfirmationsController < Devise::ConfirmationsController
    # GET /account/email_verification?confirmation_token=abcdef
    def show
      confirmation_token = params.fetch(:confirmation_token)
      resource = resource_class.confirm_by_token(confirmation_token)

      if resource.errors.empty?
        set_flash_message!(:notice, :confirmed)
        redirect_to(after_confirmation_path_for(resource_name, resource))
      else
        message = resource.errors.full_messages.first!
        redirect_to(
          new_confirmation_path(resource),
          alert: "Couldn't verify email: #{message}"
        )
      end
    end

    # GET /account/email_verification/resend
    def new
      render(inertia: "RequestEmailVerificationPage")
    end

    # POST /email_verification
    def create
      self.resource = resource_class
                      .send_confirmation_instructions(confirmation_params)
      if successfully_sent?(resource)
        redirect_url = params[:redirect_url] || root_path
        redirect_to(redirect_url)
      else
        redirect_to(new_confirmation_path(resource), inertia: {
                      errors: resource.form_errors
                    })
      end
    end

    private

    def confirmation_params
      params.require(:confirmation).permit(:email)
    end
  end
end
