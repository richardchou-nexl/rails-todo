import React from "react"
import { Select as MuiSelect, MenuItem, Typography, Box, SxProps, Theme } from "@mui/material"
import { FieldLabel } from "./FieldLabel"
import { IconWithTooltipVariant } from "./IconWithTooltip"

export interface IOptionObject {
  id: string
}

export interface IBasicSelectProps<T> {
  value: T | null
  setValue: (value: T) => void
  options: T[]
  label: string
  hideLabel?: boolean
  errorMessage: string | undefined
  fullWidth?: boolean
  sx?: SxProps<Theme>
  disabled?: boolean
  disabledOptionLabel?: string
  getOptionLabel: (option: T) => string
  getOptionValue: (option: T) => string
  placeholderText?: string
  tooltipIconVariant?: IconWithTooltipVariant
  toolTipTitle?: string
}

export const BasicSelect = <T extends IOptionObject>({
  value,
  setValue,
  options,
  label,
  hideLabel = false,
  errorMessage,
  fullWidth = false,
  sx,
  disabled = false,
  disabledOptionLabel,
  placeholderText,
  getOptionLabel,
  getOptionValue,
  tooltipIconVariant,
  toolTipTitle
}: IBasicSelectProps<T>): React.ReactNode => {
  const labelId = `select_${label.replaceAll(" ", "_")}`
  const renderSelect = (
    <>
      <MuiSelect
        aria-labelledby={labelId}
        value={value === null ? "" : getOptionValue(value)}
        label=""
        size="small"
        fullWidth={fullWidth}
        sx={{ backgroundColor: "white" }}
        onChange={(e) => {
          const newValue = options.find((option) => getOptionValue(option) === e.target.value)
          if (newValue) {
            setValue(newValue)
          }
        }}
        disabled={disabled}
        displayEmpty
        renderValue={(selected) => {
          if (selected?.length > 0) {
            const selectedOption = options.find((option) => getOptionValue(option) === selected)
            if (selectedOption) {
              return getOptionLabel(selectedOption)
            }
          }
          return <Typography sx={{ fontSize: 16, color: "grey.500" }}>{placeholderText}</Typography>
        }}
      >
        {disabledOptionLabel && (
          <MenuItem value="" disabled>
            <Typography sx={{ fontSize: 16, color: "grey.500" }}>{disabledOptionLabel}</Typography>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.id} value={getOptionValue(option)}>
            {getOptionLabel(option)}
          </MenuItem>
        ))}
      </MuiSelect>
      {errorMessage && (
        <Typography color="error" variant="caption">
          {errorMessage}
        </Typography>
      )}
    </>
  )
  if (hideLabel) return <Box sx={sx}>{renderSelect}</Box>
  return (
    <Box sx={sx}>
      <FieldLabel label={label} labelId={labelId} tooltipIconVariant={tooltipIconVariant} toolTipTitle={toolTipTitle}>
        {renderSelect}
      </FieldLabel>
    </Box>
  )
}
