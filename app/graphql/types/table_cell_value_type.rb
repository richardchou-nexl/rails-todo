# frozen_string_literal: true

module Types
  class IntegerCellType < ::Types::BaseObject
    field :integer, Integer, null: true, method: :itself
  end

  class StringCellType < ::Types::BaseObject
    field :string, String, null: true, method: :itself
  end

  class TableCellValueType < ::Types::BaseUnion
    possible_types IntegerCellType, StringCellType

    def self.resolve_type(object, _ctx)
      case object
      when String
        StringCellType
      when Integer
        IntegerCellType
      else
        raise "Unexpected TableCellValue type: #{object.class.name}"
      end
    end
  end
end
