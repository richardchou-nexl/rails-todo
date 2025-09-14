# typed: strict

module Types
  class TodoResultType < ::Types::BaseObject
    field :id, ID, null: false
    field :subject, String, null: false
  end

  class ItemResultType < ::Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
  end

  class SearchResultUnion < Types::BaseUnion
    extend T::Sig

    possible_types TodoResultType, ItemResultType

    sig do
      params(object: T.untyped,
             _ctx: T.untyped).returns(T.any(T.class_of(TodoResultType), T.class_of(ItemResultType)))
    end
    def self.resolve_type(object, _ctx)
      case object
      when ::Todo
        TodoResultType
      when ::Item
        ItemResultType
      else
        raise "Unexpected SearchResult type: #{object.class.name}"
      end
    end
  end
end
