module Inputs
  class TableSourceInput < ::Types::BaseInputObject
    extend T::Sig

    argument :row_type, String, required: true
    argument :list_uid, GraphQL::Types::ID, required: false

    def table_implementation
      T.cast(row_type, T.class_of(Tables::TableImplementation))
       .new(list_uid: list_uid)
    end
  end
end
