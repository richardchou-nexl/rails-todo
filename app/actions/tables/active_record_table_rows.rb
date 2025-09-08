# typed: strict

module Tables
  class ActiveRecordTableRows < T::Struct
    extend T::Sig
    include Tables::TableRows

    const :base_scope, ActiveRecord::Relation
    const :base_class, T.class_of(ApplicationRecord)

    sig { override.returns(T::Array[TableRow]) }
    def entries
      scope.map do |record|
        TableRow.new(
          id: record.id.to_s,
          cells: selected.map do |column|
            Tables::TableCell.new(
              id: "#{record.id}_#{column.id}",
              column: column,
              value: record.public_send(column.id).to_s
            )
          end
        )
      end
    end

    sig { override.returns(Integer) }
    def total_count
      binding.pry
    end

    sig { override.returns(Integer) }
    def total_pages
      binding.pry
    end

    private

    sig { returns(ActiveRecord::Relation) }
    def build_scope
      base_scope
    end

    sig { returns(ActiveRecord::Relation) }
    def scope
      @scope ||= T.let(build_scope, T.nilable(ActiveRecord::Relation))
    end

    sig { returns(T::Array[Column]) }
    def selected
      [
        Tables::Column.new(id: 'id', name: 'ID'),
        Tables::Column.new(id: 'subject', name: 'Subject')
      ]
    end
  end
end
