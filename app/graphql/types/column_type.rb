module Types
  class ColumnType < ::Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :orderable, Boolean, null: false
  end
end
