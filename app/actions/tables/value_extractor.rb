# typed: strict

module Tables
  class ValueExtractor
    extend T::Sig

    sig { params(selected: T::Array[Tables::Column]).void }
    def initialize(selected:)
      @selected = T.let(selected, T::Array[Tables::Column])
    end

    sig { params(record: ApplicationRecord).returns(TableRow) }
    def record_to_row(record:)
      TableRow.new(
        id: record.id.to_s,
        cells: @selected.map do |column|
          Tables::TableCell.new(
            id: "#{record.id}_#{column.id}",
            column: column,
            value: record.public_send(column.id).to_s
          )
        end
      )
    end
  end
end
