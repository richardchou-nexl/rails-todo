module Types
  class TodoStatusEnum < Types::BaseEnum
    value "NOT_STARTED", "Not started", value: "not_started"
    value "IN_PROGRESS", "In progress", value: "in_progress"
    value "COMPLETED", "Completed", value: "completed"
  end
end
