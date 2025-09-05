# typed: true

class Item < ApplicationRecord
  extend T::Sig

  belongs_to :todo

  validates :title, presence: true
end
