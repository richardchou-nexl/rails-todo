# typed: true

class Todo < ApplicationRecord
  extend T::Sig

  has_and_belongs_to_many :categories
  has_many :items

  validates :subject, presence: true
  validates :status, presence: true, inclusion: { in: TodoStatus.values.map(&:serialize) }
end
