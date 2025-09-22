import React, { useMemo, useState } from "react"
import { ModalHandler } from "../common/ModalHandler"
import { Button, ButtonCategory } from "../common/Button"
import { Form, Formik, FormikHelpers } from "formik"
import { Box, CircularProgress, Divider, Typography } from "@mui/material"
import { FormikTextField } from "../common/FormikTextField"
import * as Yup from "yup"
import { FormikBasicSelect } from "../common/FormikBasicSelect"
import { KeyValueListField } from "../common/KeyValueListField"
import { IKeyValueItem } from "../common/KeyValueListField"

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
  const [jsonPathColumnPairs, setJsonPathColumnPairs] = useState([{ jsonPath: "", column: { id: "", label: "", value: "" } }])
  const [headers, setHeaders] = useState<IKeyValueItem[]>([])

  const methodOptions: IOptionObject[] = useMemo(
    () => [
      { id: "GET", label: "GET", value: HttpMethodEnum.Get },
      { id: "POST", label: "POST", value: HttpMethodEnum.Post }
    ],
    []
  )

  const options = [
    {
      id: "1",
      name: "value 1",
      updateable: true
    },
    {
      id: "2",
      name: "value 2",
      updateable: true
    },
    {
      id: "3",
      name: "value 3",
      updateable: false
    },
    {
      id: "4",
      name: "value 4",
      updateable: true
    },
    {
      id: "5",
      name: "value 5",
      updateable: true
    },
    {
      id: "6",
      name: "value 6",
      updateable: true
    },
    {
      id: "7",
      name: "value 7",
      updateable: false
    },
    {
      id: "8",
      name: "value 8",
      updateable: true
    },
    {
      id: "9",
      name: "value 9",
      updateable: false
    },
    {
      id: "10",
      name: "value 10",
      updateable: true
    }
  ]
  const columnOptions = options
    .filter((option) => option.updateable)
    .map((option) => ({
      id: option.id,
      label: option.name,
      value: option.id
    }))

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

                <KeyValueListField
                  items={jsonPathColumnPairs.map((p) => ({
                    key: p.jsonPath,
                    value: p.column
                  }))}
                  setItems={(items) => {
                    setJsonPathColumnPairs(
                      items.map((item) => ({
                        jsonPath: item.key,
                        column: item.value
                      }))
                    )
                  }}
                  leftLabel="JSON Path"
                  rightLabel="Column"
                  buttonLabel="Add JSON Mapping"
                  columnOptions={columnOptions}
                  minimumItems={0}
                  placeholder={"Enter JSON Path"}
                />

                <KeyValueListField
                  items={headers}
                  setItems={setHeaders}
                  leftLabel="Header Name"
                  rightLabel="Header Value"
                  buttonLabel="Add Header"
                  placeholder={"Enter Header Name"}
                />
              </Box>
            </Box>
          </Form>
        </Formik>
      </ModalHandler>
    </>
  )
}
