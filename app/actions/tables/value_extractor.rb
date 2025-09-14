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

    sig { params(record: ApplicationRecord).returns(TableRow) }
    def record_to_row(record:)
      TableRow.new(
        id: record.id.to_s,
        cells: selected.map do |column|
          column_to_cell(column: column, record: record)
        end
      )
    end

    sig { params(column: Tables::Column, record: ApplicationRecord).returns(TableCell) }
    def column_to_cell(column:, record:)
      Tables::TableCell.new(
        id: "#{record.id}_#{column.id}",
        column: column,
        values: Array.wrap(record.public_send(column.id).to_s)
      )
    end
  end
end
