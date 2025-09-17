import React from "react";
import { useField } from "formik";
import { TextField, ITextFieldProps } from "./TextField";
interface IFormikTextFieldProps
  extends Omit<
    ITextFieldProps,
    "uniqueId" | "value" | "setValue" | "errorMessage"
  > {
  name: string;
}
export const FormikTextField: React.FC<IFormikTextFieldProps> = ({
  name,
  ...props
}) => {
  const [field, meta, helpers] = useField<string>({ name });
  return (
    <TextField
      uniqueId={name}
      value={field.value}
      setValue={helpers.setValue}
      errorMessage={(meta.touched && meta.error) || undefined}
      {...props}
    />
  );
};
