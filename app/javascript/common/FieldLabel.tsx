import React from "react"
import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { RequiredFieldMark } from "./RequiredFieldMark"
import { IconWithTooltip, IconWithTooltipVariant } from "./IconWithTooltip"

export const FieldLabel: React.FC<{
  label?: string | JSX.Element
  children: React.ReactNode
  labelId?: string
  color?: string
  required?: boolean
  toolTipTitle?: string
  tooltipIconVariant?: IconWithTooltipVariant
  totalHeightForLabelAndField?: number
}> = ({ children, label, labelId, color, required, toolTipTitle, tooltipIconVariant = "info", totalHeightForLabelAndField }) => {
  const { t: translate } = useTranslation("common")
  return (
    <Box sx={{ mb: 2, height: totalHeightForLabelAndField }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography id={labelId} component="label" variant="subtitle2" color={color ? color : undefined}>
          {label}
          {required && <RequiredFieldMark />}
        </Typography>
        {toolTipTitle && (
          <IconWithTooltip
            tooltipText={toolTipTitle}
            placement="right-start"
            aria-label={translate("components.tooltips.tooltip_information")}
            variant={tooltipIconVariant}
            iconSx={{ ml: 1 }}
          />
        )}
      </Box>
      <Box sx={{ mt: 0.5 }}>{children}</Box>
    </Box>
  )
}
