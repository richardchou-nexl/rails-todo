# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # query Todos($status: TodoStatusEnum) {
    #   todos(status: $status) {
    #     id
    #     status
    #     subject

    #     items	{
    #       title
    #     }
    #   }
    # }
    field :todos, [Types::TodoType], null: false do
      description 'List of todos'
      argument :status, Types::TodoStatusEnum, required: false
    end

    field :search, [Types::SearchResultUnion], null: false do
      description 'Search todos and items'
      argument :query, String, required: true
    end

    class TableRowEntriesType < ::Types::BaseObject
      field :entries, [Types::TableRowType], null: false
    end

    field :table_rows, TableRowEntriesType, null: false do
      description 'Table rows'
      argument :source, Inputs::TableSourceInput, required: true
    end

    def todos(status: nil)
      scope = ::Todo.includes(:items)
      scope = scope.where(status: status).references(:statuses) if status.present?
      scope
    end

    def search(query:)
      q = "%#{query.to_s.downcase}%"
      todos = ::Todo.where('LOWER(subject) LIKE ?', q)
      items = ::Item.where('LOWER(title) LIKE ?', q)

      todos + items
    end

    def table_rows(source:)
      table = source.table_implementation
      result = table.rows(selected: selected)

      { entries: result.entries }
    end

    private

    def selected
      [
        Tables::Column.new(id: 'id', name: 'ID'),
        Tables::Column.new(id: 'subject', name: 'Subject')
      ]
    end
  end
end
