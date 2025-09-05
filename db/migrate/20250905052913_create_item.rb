class CreateItem < ActiveRecord::Migration[8.0]
  def change
    create_table :items do |t|
      t.references :todo, null: false, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
