module Types
  class TableCellType < ::Types::BaseObject
    field :id, ID, null: false
    field :value, String, null: false
    field :column, ColumnType, null: false
  end
end
