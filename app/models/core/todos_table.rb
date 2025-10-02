# typed: strict

module Core
  class TodosTable < Tables::TableImplementation
    extend T::Sig

    COLUMN_DEFINITIONS_PATH = T.let(Pathname.new("#{__dir__}/todos_table.json").freeze, Pathname)

    sig { override.returns(Pathname) }
    def column_definitions_path
      COLUMN_DEFINITIONS_PATH
    end

    sig { override.returns(T::Array[Tables::Column]) }
    def columns
    end

    sig { override.params(selected: T::Array[Tables::Column]).returns(Tables::TableRows) }
    def rows(selected:)
      Tables::ActiveRecordTableRows.new(
        base_scope: base_scope,
        base_class: Todo,
        selected: selected
      )
    end

    sig { returns(ActiveRecord::Relation) }
    def base_scope
      ::Todo.all
    end
  end
end
