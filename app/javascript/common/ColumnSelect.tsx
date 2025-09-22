import React from "react"
import { IColumnOption } from "./KeyValueListField"
import { Box } from "@mui/material"
import { BasicSelect } from "./BasicSelect"

interface IColumnSelectProps {
  columnOptions: IColumnOption[]
  suffixComponent: React.ReactNode
  onSelect: (option: IColumnOption) => void
}

export const ColumnSelect: React.FC<IColumnSelectProps> = ({ columnOptions, suffixComponent, onSelect }): React.ReactNode => {
  const [value, setValue] = React.useState<IColumnOption | null>(null)

  const handleSetValue = (option: IColumnOption) => {
    setValue(option)
    onSelect(option)
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <BasicSelect
          value={value}
          setValue={handleSetValue}
          label="Column Name"
          fullWidth
          options={columnOptions}
          getOptionLabel={(o) => o.label}
          getOptionValue={(o) => o.value}
          errorMessage=""
        />
        {suffixComponent}
      </Box>
    </>
  )
}
