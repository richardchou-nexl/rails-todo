# typed: strict

module Types
  class SearchResultUnion < Types::BaseUnion
    extend T::Sig

    possible_types TodoType, ItemType

    sig do
      params(object: T.untyped,
             _ctx: T.untyped).returns(T.any(T.class_of(TodoType), T.class_of(ItemType)))
    end
    def self.resolve_type(object, _ctx)
      case object
      when ::Todo
        TodoType
      when ::Item
        ItemType
      else
        raise "Unexpected SearchResult type: #{object.class.name}"
      end
    end
  end
end
