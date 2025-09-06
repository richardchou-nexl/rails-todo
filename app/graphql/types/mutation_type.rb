# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    # mutation InsertTodo($subject: String!, $status: TodoStatusEnum) {
    #   insertTodo(subject: $subject, status: $status) {
    #     id
    #     subject
    #   }
    # }
    field :insert_todo, Types::TodoType, null: false do
      argument :subject, String, required: true
      argument :status, Types::TodoStatusEnum, required: false
    end

    def insert_todo(subject:, status: nil)
      status ||= ::TodoStatus::NOT_STARTED.serialize

      ::Todo.create!(subject: subject, status: status)
    end
  end
end
