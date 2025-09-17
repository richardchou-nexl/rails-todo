import React from "react";
import {
  Tooltip as MuiTooltip,
  SxProps,
  TooltipProps as MuiTooltipProps,
} from "@mui/material";
import {
  ErrorOutline,
  HelpOutlineOutlined,
  InfoOutlined,
} from "@mui/icons-material";
export type IconWithTooltipVariant = "info" | "help" | "error";
export interface IIconWithTooltipProps
  extends Omit<MuiTooltipProps, "title" | "children"> {
  tooltipText: React.ReactNode;
  variant: IconWithTooltipVariant;
  iconSx?: SxProps;
}
export const IconWithTooltip: React.FC<IIconWithTooltipProps> = ({
  tooltipText,
  variant,
  iconSx,
  ...props
}) => {
  const sharedIconSx: SxProps = {
    fontSize: 16,
    color: "secondary.main",
    ...iconSx,
  };
  return (
    <MuiTooltip title={tooltipText} arrow {...props}>
      {variant === "info" ? (
        <InfoOutlined
          sx={{
            ...sharedIconSx,
          }}
        />
      ) : variant === "error" ? (
        <ErrorOutline
          sx={{
            ...sharedIconSx,
          }}
        />
      ) : (
        <HelpOutlineOutlined
          sx={{
            ...sharedIconSx,
          }}
        />
      )}
    </MuiTooltip>
  );
};
