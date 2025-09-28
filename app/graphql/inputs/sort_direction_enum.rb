# frozen_string_literal: true
# typed: strict

module Inputs
  class SortDirectionEnum < ::Types::BaseEnum
    extend T::Sig

    value 'ASC', value: SortDirection::Asc
    value 'DESC', value: SortDirection::Desc
  end
end
