# typed: strict

module Tables
  class TableCell < T::Struct
    extend T::Sig

    const :id, String
    const :values, T::Array[T.untyped]
    const :column, Column
  end
end
