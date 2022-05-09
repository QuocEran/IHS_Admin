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
import { Box, TextField, MenuItem, Slide } from "@mui/material";
import patient from "../stores/patient";
import { projectFirestore } from "../configs/firebase";
import { useSnackbar } from "notistack";
import device from "../stores/device";
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

export default function CreateDevice({ open, handleClose }) {
  const patients = patient((state) => state.patients);
  const [isPending, setIsPending] = React.useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const [mac, setMac] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [patientId, setPatientId] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const timeInstance = new Date().getTime() / 1000;
    const stamp = timeInstance.toString();
    projectFirestore
      .collection("esp")
      .doc(mac)
      .set({
        espId: mac,
        patientId: patientId,
        createdDate: stamp,
        location: location,
        sensors: ["DHT11", "MAX30102", "GY-906 MX9"],
      })
      .then(() => {
        enqueueSnackbar("Create Device Successfully", {
          variant: "success",

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
    setIsPending(false);
    device.getState().getDevices();
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create New Device
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            width: "100vh",
          }}
        >
          <Box
            component="form"
            id="createForm"
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
            <TextField
              label="MAC Address"
              fullWidth
              helperText="Please select device's MAC address"
              value={mac}
              onChange={(e) => setMac(e.target.value)}
            />
            <TextField
              label="Location"
              fullWidth
              helperText="Please select location of device"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <TextField
              label="Patient"
              select
              fullWidth
              helperText="Please select patient"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            >
              {patients?.map((option) => (
                <MenuItem key={option.patientId} value={option.patientId}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="createForm" onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
