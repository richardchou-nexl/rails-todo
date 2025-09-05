# typed: strict

module Types
  class TodoStatus < T::Enum
    enums do
      NOT_STARTED = new('not_started')
      IN_PROGRESS = new('in_progress')
      COMPLETED = new('completed')
    end
  end
end