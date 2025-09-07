import { useState } from "react"

export const useModalState = (onOpenModal?: () => void, onCloseModal?: () => void) => {
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
    onOpenModal?.()
  }

  const closeModal = () => {
    setOpen(false)
    onCloseModal?.()
  }
}
