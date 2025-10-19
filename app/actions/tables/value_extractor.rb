# typed: strict

module Tables
  class ValueExtractor
    extend T::Sig

    sig { returns(T::Array[Tables::Column]) }
    attr_reader :selected

    sig { params(selected: T::Array[Tables::Column]).void }
    def initialize(selected:)
      @selected = T.let(selected, T::Array[Tables::Column])
    end

    sig { params(single_active_record: ApplicationRecord).returns(TableRow) }
    def record_to_row(single_active_record:)
      TableRow.new(
        id: single_active_record.id.to_s,
        cells: selected.map do |column|
          column_to_cell(column: column, record: single_active_record)
        end
      )
    end

    sig { params(column: Tables::Column, record: ApplicationRecord).returns(TableCell) }
    def column_to_cell(column:, record:)
      Tables::TableCell.new(
        id: "#{record.id}_#{column.id}",
        column: column,
        values: Array.wrap([record.public_send(column.id).to_s, rand(1..99)])
      )
    end
  end
end
