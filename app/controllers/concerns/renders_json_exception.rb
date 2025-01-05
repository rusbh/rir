# frozen_string_literal: true

module RendersJsonException
  extend ActiveSupport::Concern

  private

  def format_json_exception(exception)
    case exception
    when ActionPolicy::Unauthorized
      exception.result.message
    else
      exception.message
    end
  end

  def render_json_exception(exception)
    render(
      json: { error: format_json_exception(exception) },
      status: :internal_server_error
    )
  end
end
