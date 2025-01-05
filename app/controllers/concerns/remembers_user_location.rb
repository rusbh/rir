# frozen_string_literal: true

module RemembersUserLocation
  extend ActiveSupport::Concern

  included do
    before_action :store_user_location!, if: :storable_location?
  end

  private

  def storable_location?
    request.get? && is_navigational_format? &&
      (!request.xhr? || request.inertia?) && !devise_controller?
  end

  def store_user_location!
    store_location_for(:user, request.fullpath)
  end
end
