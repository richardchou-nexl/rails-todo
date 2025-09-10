# typed: strict

module Core
  class TodosTable < Tables::TableImplementation
    extend T::Sig

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
