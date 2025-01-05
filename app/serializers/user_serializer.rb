class UserSerializer < ApplicationSerializer
  identifier
  attributes :name,
             :email,
             unconfirmed_email: {
               type: :string
             }
end
