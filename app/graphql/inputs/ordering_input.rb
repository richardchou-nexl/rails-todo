# frozen_string_literal: true
# typed: true

module Inputs
  class OrderingInput < Types::BaseInputObject
    extend T::Sig

    argument :order_on_uid, String, required: true
    argument :direction, SortDirectionEnum, required: true

    sig { params(columns: T::Array[Tables::Column]).returns(SortOrder) }
    def to_sort_order(columns)
      column = columns.select(&:orderable).find { |c| c.id == T.unsafe(self).order_on_uid }
      raise GraphQL::ExecutionError, "column #{T.unsafe(self).order_on_uid} is not orderable" unless column

      direction = T.cast(T.unsafe(self).direction, SortDirection)
      SortOrder.new(column:, direction:)
    end
  end
end
