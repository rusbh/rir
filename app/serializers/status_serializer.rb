# frozen_string_literal: true

class StatusSerializer < ApplicationSerializer
  object_as :checker, model: "Healthcheck::Checker"

  attribute :status, type: :string do
    checker.errored? ? "error" : "ok"
  end
  attributes errors: { type: :'any[]' }
  attribute :booted_at, type: :string do
    Rir::Application.booted_at
  end
end
