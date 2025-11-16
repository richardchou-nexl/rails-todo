# typed: strict

module Tables
  class TableColumnOrderer
    extend T::Sig
    include OrderApplier

    sig { params(table_name: String).void }
    def initialize(table_name)
      @table_name = table_name
    end

    sig do
      override.params(active_record_relation: ActiveRecord::Relation, column: Column,
                      direction: SortDirection).returns(ActiveRecord::Relation)
    end
    def apply(active_record_relation, column:, direction:)
      column_name = column.order_column!

      active_record_relation.reorder(@table_name => { column_name => direction.serialize })
                            .order(@table_name => { id: direction.serialize })
    end
  end
end
