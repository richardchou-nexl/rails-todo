# frozen_string_literal: true

module Types
  class TableRowType < ::Types::BaseObject
    field :id, ID, null: false
    field :cells, [Types::TableCellType], null: false
  end
end
