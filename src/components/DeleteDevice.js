import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Radio, RadioGroup, FormControlLabel, Slide } from "@mui/material";
import device from "../stores/device";
import { projectFirestore } from "../configs/firebase";
import { useSnackbar } from "notistack";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DeleteDevice({ open, handleClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const devices = device((state) => state.devices);
  const [espId, setEspId] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    projectFirestore
      .collection("esp")
      .doc(espId)
      .delete()
      .then(() => {
        enqueueSnackbar("Delete Device Successfully", {
          variant: "info",
          TransitionComponent: Slide,
          autoHideDuration: 3000,
          preventDuplicate: true,
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          TransitionComponent: Slide,
          autoHideDuration: 3000,
          preventDuplicate: true,
        });
      });

    device.getState().getDevices();
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Delete Device
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            width: "100vh",
          }}
        >
          <Box
            id="deleteForm"
            component="form"
            sx={{
              // "& > :not(style)": { border: "1px solid #eee" },
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <RadioGroup
              aria-label="ringtone"
              name="ringtone"
              value={espId}
              onChange={(e) => setEspId(e.target.value)}
            >
              {devices?.map((option) => (
                <FormControlLabel
                  value={option.espId}
                  key={option.espId}
                  control={<Radio />}
                  label={option.espId}
                />
              ))}
            </RadioGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="deleteForm">
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
