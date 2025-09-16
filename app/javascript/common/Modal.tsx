import React from "react";
import {
  Modal as MUIModal,
  Paper,
  Backdrop,
  IconButton,
  Typography,
  SxProps,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

interface IModalProps {
  open: boolean;
  onClose: () => void;
  width?: string | number;
  height?: string | number;
  children: React.ReactNode;
  header?: React.ReactNode;
  headerSx?: SxProps;
  modalPaperSx?: SxProps;
  modalDataCy?: string;
  caption?: React.ReactNode;
}
export const Modal: React.FC<IModalProps> = ({
  open,
  onClose,
  children,
  width,
  height,
  header,
  headerSx,
  modalPaperSx,
  modalDataCy,
  caption,
}) => {
  const { t: translate } = useTranslation("common");
  return (
    <MUIModal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.stopPropagation();
        }
      }}
    >
      <Paper
        data-cy={modalDataCy || "modal-content"}
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 5,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width,
          maxHeight: "80vh",
          overflowY: "auto",
          height,
          ...modalPaperSx,
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            right: "0px",
            top: "0px",
            padding: "5px",
          }}
          onClick={() => onClose()}
          data-cy="close-modal"
          size="large"
          aria-label={translate("common.close_modal")}
        >
          <CloseIcon />
        </IconButton>
        {open && (
          <>
            {(header || caption) && (
              <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                {header && (
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "start", display: "flex", ...headerSx }}
                  >
                    {header}
                  </Typography>
                )}
                {caption && (
                  <Typography
                    sx={{ textAlign: "start", color: "grey.700" }}
                    variant="body2"
                  >
                    {caption}
                  </Typography>
                )}
              </Box>
            )}
            {children}
          </>
        )}
      </Paper>
    </MUIModal>
  );
};
