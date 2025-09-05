# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    
    field :todos, [Types::TodoType], null: false do
      description "List of todos"
      argument :status, Types::TodoStatusEnum, required: false
    end

    def todos(status: nil)
      scope = ::Todo.all
      scope = scope.where(status: status) if status.present?
      scope
    end
  end
end
