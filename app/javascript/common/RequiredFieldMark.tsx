import React from "react";
import { Typography } from "@mui/material";

export const RequiredFieldMark: React.FC = () => {
  return (
    <Typography component={"span"} color={"error"}>
      *
    </Typography>
  );
};
