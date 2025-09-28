# frozen_string_literal: true
# typed: true

module Inputs
  class OrderingInput < Types::BaseInputObject
    extend T::Sig

    argument :order_on_uid, String, required: true
    argument :direction, SortDirectionEnum, required: true
  end
end
