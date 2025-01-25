# frozen_string_literal: true

require "active_support"

class Object
  def is_any?(*modules) # rubocop:disable Naming/PredicateName
    modules.any? { |klass| is_a?(klass) }
  end

  def truthy?
    false
  end

  def falsy?
    false
  end
end

class TrueClass
  def truthy?
    true
  end

  def falsy?
    false
  end
end

class FalseClass
  def truthy?
    false
  end

  def falsy?
    true
  end
end

class String
  def truthy?
    case downcase
    when "t", "true", "1", "yes"
      true
    else
      false
    end
  end

  def falsy?
    case downcase
    when "f", "false", "0", "no"
      true
    else
      false
    end
  end
end

class NilClass
  def truthy?
    false
  end

  def falsy?
    false
  end
end

class Array
  def first! = fetch(0)
end

module Kernel
  # Execute the provided block; used to as an alternative to (begin...end) that
  # does not pollute the local scope with variables declared in the block.
  def scoped(&)
    yield
  end
end
