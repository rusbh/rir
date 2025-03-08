# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  identifier
  attributes :name,
             :email,
             unconfirmed_email: {
               type: :string,
               optional: true,
             },
             owner?: { as: :is_owner, type: :boolean }

  has_one :avatar_blob, as: :avatar, serializer: ImageSerializer, optional: true
end
