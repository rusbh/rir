# frozen_string_literal: true

class HealthCheckSerializer < ApplicationSerializer
  object_as :checker, model: "Healthcheck::Checker"

  attribute :status, type: :string do
    checker.errored? ? "error" : "ok"
  end
  attributes errors: { type: :'any[]' }
end
