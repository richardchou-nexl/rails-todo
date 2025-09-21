import React from "react"
import { Button, ButtonCategory } from "./Button"
import { Box, Grid, Divider, IconButton } from "@mui/material"
import { Add, DeleteOutline } from "@mui/icons-material"
import { TextField } from "./TextField"

export interface IKeyValueItem {
  key: string
  value: any
}

interface IColumnOption {
  id: string
  label: string
  value: string
}

interface IKeyValueListFieldProps {
  items: IKeyValueItem[]
  setItems: (items: IKeyValueItem[]) => void
  leftLabel: string // e.g. "JSON Path" or "Name"
  rightLabel: string // e.g. "Column Name" or "Value"
  buttonLabel: string // e.g. "Add Connection Mapping" or "Add Header"
  columnOptions?: IColumnOption[] // required if useColumnSelectRight
  minimumItems?: number
  placeholder?: string
}

export const KeyValueListField: React.FC<IKeyValueListFieldProps> = ({
  items,
  setItems,
  leftLabel,
  rightLabel,
  buttonLabel,
  columnOptions = [],
  minimumItems = 0,
  placeholder = ""
}) => {
  const onRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <Box>
      {items.map((pair, index) => (
        <React.Fragment key={index}>
          <Grid container>
            <Grid item xs={6} sx={{ pl: 0, pr: 5 }}>
              <TextField
                uniqueId={`${leftLabel.replace(/\s+/g, "_").toLowerCase()}_${index}`}
                label={leftLabel}
                value={pair.key}
                setValue={(value) => {
                  const newItems = [...items]
                  if (newItems[index]) {
                    newItems[index].key = value
                    setItems(newItems)
                  }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  uniqueId={`${rightLabel.replace(/\s+/g, "_").toLowerCase()}_${index}`}
                  label={rightLabel}
                  value={pair.value}
                  setValue={(value) => {
                    const newItems = [...items]
                    if (newItems[index]) {
                      newItems[index].value = value
                      setItems(newItems)
                    }
                  }}
                />
                {index > 0 ? (
                  <IconButton onClick={() => onRemove(index)}>
                    <DeleteOutline fontSize="small" />
                  </IconButton>
                ) : (
                  <Box width={52} />
                )}
              </Box>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
      <Button
        category={ButtonCategory.TertiaryBlue}
        startIcon={<Add />}
        onClick={() => {
          const newItems = [...items, { key: "", value: "" }]
          setItems(newItems)
        }}
      >
        {buttonLabel}
      </Button>
      <Divider sx={{ my: 1 }} />
    </Box>
  )
}
