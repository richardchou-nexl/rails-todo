# typed: strict

module Types
  class ItemType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :created_at, String, null: false
    field :updated_at, String, null: false
  end
end
