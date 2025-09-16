import React from "react"
import { ModalHandler } from "../common/ModalHandler"
import { Button, ButtonCategory } from "../common/Button"

interface ICreateApiConnectionProps {
  children?: React.ReactElement
}

export const CreateApiConnection: React.FC<ICreateApiConnectionProps> = ({ children }) => {
  return (
    <>
      <ModalHandler handler={children || <Button category={ButtonCategory.Secondary}>{"Create API Connection"}</Button>}>
        {({ closeModal }) => <>create api connection</>}
      </ModalHandler>
    </>
  )
}
