# typed: true

module Inputs
  class TableSourceInput < ::Types::BaseInputObject
    extend T::Sig

    argument :row_type, String, required: true
    argument :list_uid, GraphQL::Types::ID, required: false

    # returns instance class that implements TableImplementation
    # for example, an instance of TodosTable
    sig { returns(Tables::TableImplementation) }
    def table_implementation
      T.cast(row_type.constantize, T.class_of(Tables::TableImplementation))
       .new(list_uid:)
    end

    sig { returns(T::Array[Tables::Column]) }
    def selected_columns
      table_implementation.columns
    end
  end
end
