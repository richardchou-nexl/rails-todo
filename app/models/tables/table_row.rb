# typed: strict

module Tables
  class TableRow < T::Struct
    const :id, String
    const :cells, T::Array[TableCell]
  end
end
