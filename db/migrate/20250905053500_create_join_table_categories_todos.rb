class CreateJoinTableCategoriesTodos < ActiveRecord::Migration[8.0]
  def change
    create_join_table :categories, :todos do |t|
      # Composite indexes for quick lookups and uniqueness
      t.index [:category_id, :todo_id], unique: true, name: "index_categories_todos_on_category_id_and_todo_id"
      t.index [:todo_id, :category_id], name: "index_categories_todos_on_todo_id_and_category_id"
    end
  end
end
