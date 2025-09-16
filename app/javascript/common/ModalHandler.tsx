import React, { ReactElement, ReactNode, useState } from "react"
import { Modal } from "./Modal"
import { SxProps } from "@mui/material"

interface IModalHandlerProps {
  children: ReactNode | ((props: { closeModal: () => void; openModal: () => void }) => ReactNode)
  handler: ReactElement
  width?: string | number
  header?: React.ReactNode
  onCloseModal?: () => void
  onOpenModal?: () => void
  modalPaperSx?: SxProps
  caption?: React.ReactNode
  isOpen?: boolean
  modalDataCy?: string
}

export const ModalHandler: React.FC<IModalHandlerProps> = ({
  children,
  handler,
  width,
  header,
  onCloseModal,
  onOpenModal,
  modalPaperSx,
  caption,
  isOpen,
  modalDataCy
}) => {
  const [open, setOpen] = useState(isOpen || false)
  const handleOpen = () => {
    setOpen(true)
    onOpenModal?.()
  }
  const handleClose = () => {
    setOpen(false)
    onCloseModal?.()
  }
  return (
    <>
      {React.cloneElement(handler, {
        onClick: () => {
          handler.props.onClick?.()
          handleOpen()
        }
      })}
      <Modal
        width={width}
        open={open}
        onClose={handleClose}
        header={header}
        modalPaperSx={modalPaperSx}
        caption={caption}
        modalDataCy={modalDataCy}
      >
        {typeof children === "function" ? children({ closeModal: handleClose, openModal: handleOpen }) : children}
      </Modal>
    </>
  )
}
