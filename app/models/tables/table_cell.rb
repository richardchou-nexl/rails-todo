# typed: strict

module Tables
  class TableCell < T::Struct
    extend T::Sig

    const :id, String
    const :value, String
    const :column, Column
  end
end
