# typed: true

module Types
  class TableLikeDefinitionType < ::Types::BaseObject
    extend T::Sig

    field :id, ID, null: false
    field :columns, [ColumnType], null: false
  end
end
