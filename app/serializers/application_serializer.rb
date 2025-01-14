class ApplicationSerializer < Oj::Serializer
  include TypesFromSerializers::DSL
  include Routing
end
