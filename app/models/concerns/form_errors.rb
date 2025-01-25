module FormErrors
  extend ActiveSupport::Concern

  def form_errors
    formatted_errors = {}
    errors.attribute_names.each do |name|
      messages = errors.full_messages_for(name)
      formatted_errors[name] = messages.first!.upcase_first
    end
    formatted_errors
  end
end
