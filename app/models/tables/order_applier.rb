# typed: strict

module Tables
  module OrderApplier
    extend T::Sig
    extend T::Helpers

    abstract!

    sig do
      abstract.params(active_record_relation: ActiveRecord::Relation, column: Column,
                      direction: SortDirection).returns(ActiveRecord::Relation)
    end
    def apply(active_record_relation, column:, direction:); end
  end
end
