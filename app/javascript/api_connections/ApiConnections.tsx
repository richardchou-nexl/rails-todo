import React, { useState } from "react"
import { ModalHandler } from "../common/ModalHandler"
import { Button, ButtonCategory } from "../common/Button"
import { Modal } from "../common/Modal"
import { CreateApiConnection } from "./CreateApiConnection"

interface IApiConnecitonsProps {
  children?: React.ReactElement
}

export const ApiConnections: React.FC<IApiConnecitonsProps> = ({ children }) => {
  const [currentConnection, setCurrentConnection] = useState(false)

  const handleOnClick = () => {
    setCurrentConnection(true)
  }

  const handleClose = (closeModal: Function) => {
    setCurrentConnection(false)
    closeModal()
  }

  return (
    <>
      <ModalHandler handler={children || <Button category={ButtonCategory.Secondary}>{"Manage API Connections"}</Button>}>
        {({ closeModal }) => (
          <>
            <Button category={ButtonCategory.Secondary} onClick={handleOnClick}>
              {"Show API Connection"}
            </Button>
            <CreateApiConnection />
            {currentConnection && (
              <Modal open={currentConnection} onClose={() => setCurrentConnection(false)}>
                This is a modal
              </Modal>
            )}
          </>
        )}
      </ModalHandler>
    </>
  )
}
