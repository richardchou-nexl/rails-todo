# typed: strict

module Tables
  class Column < T::Struct
    extend T::Sig

    const :id, String
    const :name, String
    const :orderable, T::Boolean
  end
end
