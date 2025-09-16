import React from "react";
import { ButtonProps, Button as MuiButton } from "@mui/material";

export enum ButtonCategory {
  Primary = "Primary",
  Secondary = "Secondary",
  TertiaryBlue = "TertiaryBlue",
  TertiaryGrey = "TertiaryGrey",
  TertiaryRed = "TertiaryRed",
}
export interface IButtonProps {
  category: ButtonCategory;
}
export const Button: React.FC<ButtonProps & IButtonProps> = ({
  category,
  ...props
}) => {
  const buttonType: ButtonProps = getButtonType(category);
  return (
    <MuiButton
      color={buttonType.color}
      variant={buttonType.variant}
      size="small"
      sx={{ minWidth: 80 }}
      {...props}
    />
  );
};
const getButtonType = (category: ButtonCategory): ButtonProps => {
  switch (category) {
    case ButtonCategory.Primary:
      return {
        color: "primary",
        variant: "contained",
      };
    case ButtonCategory.Secondary:
      return {
        color: "primary",
        variant: "outlined",
      };
    case ButtonCategory.TertiaryBlue:
      return {
        color: "primary",
        variant: "text",
      };
    case ButtonCategory.TertiaryGrey:
      return {
        color: "secondary",
        variant: "text",
      };
    case ButtonCategory.TertiaryRed:
      return {
        color: "error",
        variant: "text",
      };
  }
};
