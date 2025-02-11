Rails.application.routes.draw do
  defaults export: true do
    root "home#index"
    Healthcheck.routes(self)
    get "up" => "rails/health#show", as: :rails_health_check
  end

  scope controller: :errors do
    match "/401", action: :unauthorized, via: :all
    match "/404", action: :not_found, via: :all
    match "/422", action: :unprocessable_entity, via: :all
    match "/500", action: :internal_server_error, via: :all
  end

  devise_for :users,
             skip: %i[registration confirmation password],
             controllers: {
               sessions: 'users/sessions'
               #  omniauth_callbacks: "users/omniauth_callbacks",
             },
             path: '/',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout'
             }

  devise_scope :user do
    scope module: :users, as: :user, export: true do
      # User Registration
      resource :registration,
               path: '/signup',
               only: %i[new create destroy],
               path_names: { new: '' }

      # User Info Modification
      resource(:registration,
               path: '/account',
               only: %i[edit update],
               path_names: { edit: '' }) do
        put :email, action: :change_email, as: :change_email
        put :password, action: :change_password, as: :change_password
      end

      scope path: "/account" do
        # Email Confirmation
        resource :confirmation,
                 path: '/email_verification',
                 only: %i[new show create],
                 path_names: {
                   new: 'resend'
                 }

        # Password Management Routes
        resource :password,
                 only: %i[new edit create update],
                 path_names: {
                   new: 'reset',
                   edit: 'change'
                 }
      end
    end
  end

  resources :files, only: :show, param: :signed_id, export: true
  resources :images, only: :show, param: :signed_id, export: true

  resources :password_strength_checks, only: :create, export: true

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
