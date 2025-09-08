# typed: strict

module Core
  class TodosTable < Tables::TableImplementation
    extend T::Sig

    sig { override.returns(Tables::TableRows) }
    def rows
      binding.pry
    end

    sig { returns(ActiveRecord::Relation) }
    def base_scope
      ::Todo.all
    end
  end
end
