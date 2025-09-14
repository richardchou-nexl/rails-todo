module Types
  class TableCellType < ::Types::BaseObject
    field :id, ID, null: false
    field :values, [TableCellValueType], null: false
    field :column, ColumnType, null: false

    def values
      object.values.compact
    end
  end
end
