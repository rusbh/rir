# frozen_string_literal: true

class ApplicationPolicy < ActionPolicy::Base
  authorize :user, allow_nil: true

  pre_check :allow_owners!

  private

  def allow_owners!
    allow! if user&.owner?
  end
end
