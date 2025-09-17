import React from "react"
import { InputBaseComponentProps, SxProps, TextField as MuiTextField, Typography } from "@mui/material"
import { FieldLabel } from "./FieldLabel"

export interface ITextFieldProps {
  uniqueId: string
  label?: string
  placeholder?: string
  dataCy?: string
  type?: string
  rows?: number
  noMargin?: boolean
  externalLabel?: boolean
  sx?: SxProps
  inputProps?: InputBaseComponentProps
  caption?: string
  maxRows?: number
  multiline?: boolean
  labelledById?: string
  focused?: boolean
  disabled?: boolean
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  ariaLabelForTextField?: string
  minWidth?: number
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  errorMessage?: string | React.ReactNode
  value: string
  setValue: (value: string) => void
  required?: boolean
}
export const TextField: React.FC<ITextFieldProps> = ({
  uniqueId,
  label,
  placeholder,
  dataCy,
  type,
  rows,
  noMargin,
  externalLabel,
  sx,
  inputProps,
  caption,
  maxRows,
  multiline,
  labelledById,
  onKeyDown,
  focused,
  disabled,
  ariaLabelForTextField,
  minWidth,
  onBlur,
  errorMessage,
  value,
  setValue,
  required
}) => {
  const renderField = (fieldLabel: string | undefined) => (
    <>
      <MuiTextField
        aria-label={ariaLabelForTextField}
        focused={focused || false}
        type={type || "text"}
        label={fieldLabel}
        placeholder={placeholder || label}
        variant={type === "hidden" ? "standard" : "outlined"}
        size="small"
        data-cy={dataCy || uniqueId}
        fullWidth
        multiline={multiline}
        sx={{
          marginBottom: noMargin || externalLabel ? 0 : 2,
          minWidth: minWidth ?? 300,
          backgroundColor: "white",
          borderRadius: 1,
          ...sx
        }}
        rows={rows || 1}
        maxRows={rows ? undefined : maxRows || 5}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        disabled={disabled}
        inputProps={{
          autoComplete: "autocompleteoff", //use random string to prevent browsers from ignoring autoComplete attribute
          name: "doNotSearchThisField", //prevent safari from autofilling
          ...inputProps
        }}
        aria-labelledby={labelledById || labelId(uniqueId)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      {caption && (
        <Typography variant="caption" color="textSecondary">
          {caption}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="caption" color="error">
          {errorMessage}
        </Typography>
      )}
    </>
  )
  return externalLabel ? (
    <FieldLabel labelId={labelId(uniqueId)} label={label} color={disabled ? "grey.400" : undefined} required={required}>
      {renderField("")}
    </FieldLabel>
  ) : (
    renderField(label)
  )
}

const labelId = (name: string) => `formik_textfield_${name}`
