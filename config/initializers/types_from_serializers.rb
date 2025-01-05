# frozen_string_literal: true

return unless Rails.env.development?

TypesFromSerializers.config do |config|
  config.base_serializers = ["ApplicationSerializer"]
  config.output_dir = Rails.root.join("app/frontend/types/generated")
  config.sql_to_typescript_type_mapping.update(
    json: "Record<string, string>",
    jsonb: "Record<string, string>",
    uuid: :string,
    date: :string,
    datetime: :string
  )
  config.namespace = "Schema"
  config.transform_keys = ->(key) { key }
end
