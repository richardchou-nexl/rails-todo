import React, { useMemo } from "react"
import { ModalHandler } from "../common/ModalHandler"
import { Button, ButtonCategory } from "../common/Button"
import { Form, Formik, FormikHelpers } from "formik"
import { Box, CircularProgress, Divider, Typography } from "@mui/material"
import { FormikTextField } from "../common/FormikTextField"
import * as Yup from "yup"
import { FormikBasicSelect } from "../common/FormikBasicSelect"

interface ICreateApiConnectionProps {
  children?: React.ReactElement
}

export enum HttpMethodEnum {
  Get = "GET",
  Post = "POST"
}

interface IOptionObject {
  id: string
  label: string
  value: HttpMethodEnum
}

export interface ICreateApiConnectionValues {
  name: string
  url: string
  method: IOptionObject
  body: string
  jsonMappings: {
    jsonPath: string
    column: any
  }[]
}

const MODAL_WIDTH = 736

export const CreateApiConnection: React.FC<ICreateApiConnectionProps> = ({ children }) => {
  const methodOptions: IOptionObject[] = useMemo(
    () => [
      { id: "GET", label: "GET", value: HttpMethodEnum.Get },
      { id: "POST", label: "POST", value: HttpMethodEnum.Post }
    ],
    []
  )

  const initialValues = {
    name: "",
    url: "",
    method: methodOptions[0],
    body: "",
    jsonMappings: [
      {
        jsonPath: "",
        column: ""
      }
    ]
  } as ICreateApiConnectionValues

  const schema = useMemo(() => Yup.object().shape({}), [])

  const handleCreate = (values: ICreateApiConnectionValues, actions: FormikHelpers<ICreateApiConnectionValues>) => {
    console.log(values)
    //actions.setSubmitting(false)
  }

  return (
    <>
      <ModalHandler handler={children || <Button category={ButtonCategory.Secondary}>{"Create API Connection"}</Button>}>
        <Formik initialValues={initialValues} onSubmit={handleCreate} validationSchema={schema}>
          <Form>
            <Box sx={{ width: MODAL_WIDTH - 100 }}>
              <Box sx={{ maxHeight: 420, overflowY: "auto", pr: 1, pt: 2 }}>
                <FormikTextField name="name" label="Name" />
                <FormikTextField name="url" placeholder="Enter API endpoint URL" />
                <Box sx={{ mb: 2 }} />
                <FormikBasicSelect
                  name="method"
                  label="Method"
                  options={methodOptions}
                  getOptionLabel={(o) => o.label}
                  getOptionValue={(o) => o.value}
                />
                <Divider sx={{ my: 1 }} />
                <FormikTextField name="body" label="Body" multiline rows={7} />
                <Divider sx={{ my: 1 }} />
              </Box>
            </Box>
          </Form>
        </Formik>
      </ModalHandler>
    </>
  )
}
