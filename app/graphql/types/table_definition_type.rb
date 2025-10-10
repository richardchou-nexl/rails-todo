# typed: true

module Types
  class TableDefinitionType < ::Types::BaseObject
    extend T::Sig

    field :id, ID, null: false
    field :columns, [ColumnType], null: false

    def id
      [table_implementation.class].compact.join('-')
    end

    private

    sig { returns(Tables::TableImplementation) }
    def table_implementation = object
  end
end
