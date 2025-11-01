# typed: strict

module Tables
  class Column < T::Struct
    extend T::Sig

    const :id, String
    const :name, String
    const :orderable, T.nilable(OrderApplier)
    const :order_column, T.nilable(String)

    sig { returns(String) }
    def order_column! = order_column.presence || id
  end
end
