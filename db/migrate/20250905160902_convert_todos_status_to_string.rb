class ConvertTodosStatusToString < ActiveRecord::Migration[8.0]
  def up
    change_column :todos, :status, :string
  end

  def down
    change_column :todos, :status, :integer
  end
end
