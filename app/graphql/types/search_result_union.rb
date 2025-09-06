# typed: strict

module Types
  class SearchResultUnion < Types::BaseUnion
    extend T::Sig

    possible_types Types::TodoType, Types::ItemType

    sig do
      params(object: T.untyped,
             _ctx: T.untyped).returns(T.any(T.class_of(Types::TodoType), T.class_of(Types::ItemType)))
    end
    def self.resolve_type(object, _ctx)
      case object
      when ::Todo
        Types::TodoType
      when ::Item
        Types::ItemType
      else
        raise "Unexpected SearchResult type: #{object.class.name}"
      end
    end
  end
end
