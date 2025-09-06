# typed: strict

module Types
  class TodoType < Types::BaseObject
    field :id, ID, null: false
    field :subject, String, null: false
    field :status, Types::TodoStatusEnum, null: false
    field :created_at, String, null: false
    field :updated_at, String, null: false

    field :items, [Types::ItemType], null: false
  end
end
