import React from "react"
import { useField } from "formik"
import { BasicSelect, IBasicSelectProps, IOptionObject } from "./BasicSelect"

interface IFormikBasicSelectProps<T> extends Omit<IBasicSelectProps<T>, "value" | "setValue" | "errorMessage"> {
  name: string
}

export const FormikBasicSelect = <T extends IOptionObject>({ ...props }: IFormikBasicSelectProps<T>) => {
  const [field, meta, helpers] = useField<T>(props.name)
  return (
    <BasicSelect
      value={field.value}
      setValue={helpers.setValue}
      errorMessage={meta.touched && meta.error ? meta.error : undefined}
      options={props.options}
      label={props.label}
      hideLabel={props.hideLabel}
      fullWidth={props.fullWidth}
      sx={props.sx}
      getOptionLabel={props.getOptionLabel}
      getOptionValue={props.getOptionValue}
      disabledOptionLabel={props.disabledOptionLabel}
      placeholderText={props.placeholderText}
    />
  )
}
