# frozen_string_literal: true

require "inertia_rails"
require "rails"
require_relative "mailer"

module InertiaRails
  class Engine
    module InitializeMailer
      extend ActiveSupport::Concern

      included do
        initializer "inertia_rails.action_mailer" do
          ActiveSupport.on_load(:action_mailer) do
            prepend Mailer
          end
        end
      end
    end
    include InitializeMailer
  end
end
