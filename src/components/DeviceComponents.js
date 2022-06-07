import {
  Avatar,
  Box,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Button,
  Input,
  IconButton,
  CircularProgress,
  Slide,
} from "@mui/material";
import React from "react";
import { useSnackbar } from "notistack";
import { timeConverter } from "../utilities/timeConvert";
import ava from "../assets/images/logo.png";
import { projectFirestore } from "../configs/firebase";
import {
  CheckCircleOutlineOutlined,
  CancelOutlined,
} from "@mui/icons-material";
export default function DeviceComponents({ espId }) {
  const { enqueueSnackbar } = useSnackbar();

  const [editId, setEditId] = React.useState(false);
  const [editLocation, setEditLocation] = React.useState(false);

  const [inputValue, setInputValue] = React.useState("");
  const [inputLoction, setInputLocation] = React.useState("");

  const [currDevice, setCurrDevice] = React.useState({});
  const [isPending, setIsPending] = React.useState(true);
  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setIsPending(true);
      e.preventDefault();
      const timeInstance = new Date().getTime() / 1000;
      const stamp = timeInstance.toString();
      projectFirestore
        .collection("esp")
        .doc(espId)
        .update({
          patientId: inputValue,
          createdDate: stamp,
        })
        .then(async () => {
          await projectFirestore.collection("patients").doc(inputValue).update({
            espId: espId,
          });
          enqueueSnackbar("Patient Id Successfully Updated!", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            TransitionComponent: Slide,
            autoHideDuration: 3000,
            preventDuplicate: true,
          });
          setEditId(false);
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            TransitionComponent: Slide,
            autoHideDuration: 3000,
            preventDuplicate: true,
          });
        });
      setIsPending(false);
    } else console.log("Null input");
  };

  const handleSubmitLoction = (e) => {
    if (inputLoction !== "") {
      setIsPending(true);
      e.preventDefault();
      const timeInstance = new Date().getTime() / 1000;
      const stamp = timeInstance.toString();
      projectFirestore
        .collection("esp")
        .doc(espId)
        .update({
          location: inputLoction,
          createdDate: stamp,
        })
        .then(() => {
          enqueueSnackbar("Location Successfully Updated!", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            TransitionComponent: Slide,
            autoHideDuration: 3000,
            preventDuplicate: true,
          });
          setEditLocation(false);
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            TransitionComponent: Slide,
            autoHideDuration: 3000,
            preventDuplicate: true,
          });
        });
      setIsPending(false);
    } else console.log("Null input");
  };

  React.useEffect(() => {
    projectFirestore
      .collection("esp")
      .doc(espId)
      .onSnapshot(async (snapshot) => {
        setCurrDevice(await snapshot.data());
        setIsPending(false);
      });

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, espId]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="16px"
    >
      <Box>
        <Avatar
          src={ava}
          alt=""
          sx={{
            width: "100px",
            height: "100px",
            "&:hover": { opacity: "0.9" },
          }}
        />
      </Box>

      {/*  */}
      <Box
        padding={2}
        border="2px solid #eeeeee"
        borderRadius="4px"
        width="100%"
      >
        <Typography variant="h6" textAlign="center">
          DEVICE INFO
        </Typography>
        {isPending ? (
          <Box
            minHeight="20vh"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ESP ID</TableCell>
                <TableCell>{currDevice.espId}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" width={148}>
                  Patient Id
                </TableCell>
                {editId ? (
                  <TableCell>
                    <Box
                      component="form"
                      sx={{
                        // "& > :not(style)": { border: "1px solid #eee" },
                        flexGrow: 1,
                        display: "flex",
                      }}
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit}
                    >
                      <Input
                        fullWidth
                        placeholder="Enter Patient Id"
                        inputProps={{ "aria-label": "description" }}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <IconButton
                        type="submit"
                        component="button"
                        color="primary"
                      >
                        <CheckCircleOutlineOutlined />
                      </IconButton>
                      <IconButton
                        component="span"
                        color="error"
                        onClick={() => setEditId(false)}
                      >
                        <CancelOutlined />
                      </IconButton>
                    </Box>
                  </TableCell>
                ) : (
                  <TableCell
                    scope="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexGrow: 1,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        sx={{
                          p: "4px 0 5px",
                          wordBreak: "break-all",
                        }}
                      >
                        {currDevice.patientId}
                      </Typography>
                    </Box>
                    <Button variant="contained" onClick={() => setEditId(true)}>
                      EDIT
                    </Button>
                  </TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Location
                </TableCell>
                {editLocation ? (
                  <TableCell>
                    <Box
                      component="form"
                      sx={{
                        // "& > :not(style)": { border: "1px solid #eee" },
                        flexGrow: 1,
                        display: "flex",
                      }}
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmitLoction}
                    >
                      <Input
                        fullWidth
                        placeholder="Enter Location"
                        defaultValue={currDevice.location}
                        inputProps={{ "aria-label": "description" }}
                        onChange={(e) => setInputLocation(e.target.value)}
                      />
                      <IconButton
                        type="submit"
                        component="button"
                        color="primary"
                      >
                        <CheckCircleOutlineOutlined />
                      </IconButton>
                      <IconButton
                        component="span"
                        color="error"
                        onClick={() => setEditLocation(false)}
                      >
                        <CancelOutlined />
                      </IconButton>
                    </Box>
                  </TableCell>
                ) : (
                  <TableCell
                    scope="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ p: "4px 0 5px" }}>
                      {currDevice.location}
                    </Typography>

                    <Button
                      variant="contained"
                      onClick={() => setEditLocation(true)}
                    >
                      EDIT
                    </Button>
                  </TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Last Updated
                </TableCell>
                <TableCell>{timeConverter(currDevice.createdDate)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Box>
      {/*  */}
      <Box
        padding={2}
        border="2px solid #eeeeee"
        borderRadius="4px"
        width="100%"
      >
        <Typography variant="h6" textAlign="center">
          SENSORS
        </Typography>
        {isPending ? (
          <Box
            minHeight="20vh"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TYPE</TableCell>
                <TableCell align="right">NAME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Temperature & Humidity
                </TableCell>
                <TableCell align="right">{currDevice.sensors[0]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Heartbeat & SpO2
                </TableCell>
                <TableCell align="right">{currDevice.sensors[1]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Body Temperature
                </TableCell>
                <TableCell align="right">{currDevice.sensors[2]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Box>
    </Box>
  );
}
