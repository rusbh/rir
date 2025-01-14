# frozen_string_literal: true

class FileSerializer < ApplicationSerializer
  identifier
  object_as :blob, model: "ActiveStorage::Blob"

  attributes :filename, :byte_size, signed_id: { type: :string }

  attribute :src, type: :string do
    rails_blob_path(blob)
  end
end
