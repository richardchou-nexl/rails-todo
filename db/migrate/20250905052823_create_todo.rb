class CreateTodo < ActiveRecord::Migration[8.0]
  def change
    create_table :todos do |t|
      t.integer :status
      t.string :subject

      t.timestamps
    end
  end
end
