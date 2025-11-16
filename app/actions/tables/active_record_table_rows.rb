# typed: strict

module Tables
  class ActiveRecordTableRows < T::Struct
    extend T::Sig
    include Tables::TableRows

    const :base_scope, ActiveRecord::Relation
    const :base_class, T.class_of(ApplicationRecord)
    const :value_extractor_class, T.class_of(ValueExtractor), factory: -> { Tables::ValueExtractor }
    const :selected, T::Array[Tables::Column]
    const :ordering, T::Array[SortOrder]

    sig { override.returns(T::Array[TableRow]) }
    def entries
      scope.map do |single_active_record|
        value_extractor.record_to_row(single_active_record: single_active_record)
      end
    end

    sig { returns(ValueExtractor) }
    def value_extractor
      @value_extractor ||= T.let(value_extractor_class.new(selected: selected), T.nilable(Tables::ValueExtractor))
    end

    sig { override.returns(Integer) }
    def total_count
      99
    end

    sig { override.returns(Integer) }
    def total_pages
      99
    end

    private

    sig { returns(ActiveRecord::Relation) }
    def build_scope
      records = base_scope
      records = apply_order(records) if ordering
      records
    end

    sig { returns(ActiveRecord::Relation) }
    def scope
      @scope ||= T.let(build_scope, T.nilable(ActiveRecord::Relation))
    end

    sig { params(records: ActiveRecord::Relation).returns(ActiveRecord::Relation) }
    def apply_order(records)
      ordered_records = T.unsafe(records)
      ordering.map do |order|
        orderable = T.must(order.column.orderable)
        ordered_records = orderable.apply(ordered_records, column: order.column, direction: order.direction)
      end.compact
      ordered_records
    end
  end
end
