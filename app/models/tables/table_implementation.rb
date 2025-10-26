# frozen_string_literal: true
# typed: strict

module Tables
  class TableImplementation
    extend T::Sig
    extend T::Helpers

    sig { returns(T.nilable(String)) }
    attr_reader :list_uid

    abstract!

    sig do
      abstract.params(selected: T::Array[Column], ordering: T::Array[SortOrder]).returns(TableRows)
    end
    def rows(selected:, ordering:); end

    sig do
      params(list_uid: T.nilable(String)).void
    end
    def initialize(list_uid: nil)
      @list_uid = T.let(list_uid, T.nilable(String))
    end

    sig { abstract.returns(Pathname) }
    def column_definitions_path; end

    sig { abstract.returns(T::Array[Column]) }
    def columns; end

    protected

    sig { params(table_name: String).returns(T::Array[Column]) }
    def load_columns_from_definitions_path(table_name)
      column_definitions = JSON.parse(File.read(column_definitions_path))
      column_definitions.map { |column| build_column_from_definition(column, table_name) }
    end

    private

    sig { params(column: T::Hash[String, T.untyped], table_name: String).returns(Tables::Column) }
    def build_column_from_definition(column, table_name)
      Tables::Column.new(
        id: column.fetch('id'),
        name: column.fetch('name'),
        orderable: column.fetch('orderable')
      )
    end
  end
end
