# typed: strict

class SortOrder < T::Struct
  const :column, Tables::Column
  const :direction, SortDirection
end
