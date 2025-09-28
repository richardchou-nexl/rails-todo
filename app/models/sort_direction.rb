# frozen_string_literal: true
# typed: strict

class SortDirection < T::Enum
  enums do
    Asc = new('asc')
    Desc = new('desc')
  end
end
