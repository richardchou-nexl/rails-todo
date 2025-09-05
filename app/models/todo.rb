class Todo < ApplicationRecord
  has_and_belongs_to_many :categories
  has_many :items

  validates :subject, presence: true
  validates :status, presence: true, inclusion: { in: %w[not_started in_progress completed] }
end
