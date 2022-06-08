import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  InputLabel,
  CircularProgress,
  InputAdornment,
  Button,
  OutlinedInput,
  Slide,
  Typography,
  Divider,
} from "@mui/material";
import { projectFirestore } from "../configs/firebase";
import { useSnackbar } from "notistack";
export default function PatientMedicalRecord({
  patientId,
  isEditing,
  setIsEditing,
}) {
  const [inputValue, setInputValue] = useState({
    espId: "",
    patientId: "",
    diagnostic: "",
    blood: "",
    weight: "",
    height: "",
    notes: "",
    address: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const [isPending, setIsPending] = useState(true);

  const [currPatient, setCurrPatient] = useState(null);
  useEffect(() => {
    projectFirestore
      .collection("patients")
      .doc(patientId)
      .onSnapshot(async (snapshot) => {
        setCurrPatient(await snapshot.data());
        setIsPending(false);
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, patientId]);

  useEffect(() => {
    setInputValue({
      espId: currPatient?.espId,
      patientId: currPatient?.patientId,
      diagnostic: currPatient?.diagnostic,
      blood: currPatient?.blood,
      weight: currPatient?.weight,
      height: currPatient?.height,
      notes: currPatient?.notes,
      address: currPatient?.address,
    });
  }, [currPatient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    projectFirestore
      .collection("patients")
      .doc(currPatient.patientId)
      .update({
        diagnostic: inputValue.diagnostic,
        blood: inputValue.blood,
        weight: inputValue.weight,
        height: inputValue.height,
        notes: inputValue.notes === undefined ? "" : inputValue.notes,
      })
      .then(() => {
        enqueueSnackbar("Patient Id Successfully Updated!", {
          variant: "success",
          TransitionComponent: Slide,
          autoHideDuration: 3000,
          preventDuplicate: true,
        });

        setIsPending(false);
        setIsEditing(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          TransitionComponent: Slide,
          autoHideDuration: 3000,
          preventDuplicate: true,
        });
      });
  };
  return (
    <>
      {!isPending ? (
        <Box
          component="form"
          sx={{
            // "& > :not(style)": { border: "1px solid #eee" },
            flexGrow: 1,
          }}
          noValidate
          autoComplete="off"
          id="medicalRecordForm"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item md={6}>
              <InputLabel sx={{ marginBottom: 1 }}>ESP ID</InputLabel>
              <Typography gutterBottom>{inputValue.espId}</Typography>
              <Divider />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ marginBottom: 1 }}>Patient ID</InputLabel>
              <Typography gutterBottom>{inputValue.patientId}</Typography>
              <Divider />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ marginBottom: 1 }}>Diagnostic</InputLabel>
              <TextField
                variant="outlined"
                InputProps={{
                  readOnly: isEditing ? false : true,
                }}
                fullWidth
                defaultValue={currPatient?.diagnostic}
                value={inputValue.diagnostic}
                onChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    diagnostic: e.target.value,
                  }))
                }
                inputProps={{ "aria-label": "description" }}
                // onChange={(e) => setInputValue(e.target.value)}
              />
            </Grid>

            <Grid item md={6}>
              <InputLabel sx={{ marginBottom: 1 }}>Blood</InputLabel>
              <TextField
                variant="outlined"
                inputProps={{
                  readOnly: isEditing ? false : true,
                }}
                defaultValue={currPatient?.blood}
                value={inputValue.blood}
                onChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    blood: e.target.value,
                  }))
                }
                fullWidth
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ marginBottom: 1 }}>Weight</InputLabel>
              <OutlinedInput
                inputProps={{
                  readOnly: isEditing ? false : true,
                }}
                defaultValue={currPatient?.weight}
                value={inputValue.weight}
                onChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    weight: e.target.value,
                  }))
                }
                endAdornment={
                  <InputAdornment position="end">kg</InputAdornment>
                }
                fullWidth
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel sx={{ marginBottom: 1 }}>Height</InputLabel>
              <OutlinedInput
                inputProps={{
                  readOnly: isEditing ? false : true,
                }}
                defaultValue={currPatient?.height}
                value={inputValue.height}
                onChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    height: e.target.value,
                  }))
                }
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
                fullWidth
              />
            </Grid>
            <Grid item md={12}>
              <InputLabel sx={{ marginBottom: 1 }}>Note</InputLabel>
              <TextField
                variant="outlined"
                InputProps={{
                  readOnly: isEditing ? false : true,
                }}
                defaultValue={currPatient?.notes}
                value={inputValue.notes}
                onChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                multiline
                fullWidth
                inputProps={{ "aria-label": "description" }}
                // onChange={(e) => setInputValue(e.target.value)}
              />
            </Grid>
            <Grid item md={12}>
              <InputLabel sx={{ marginBottom: 1 }}>Address</InputLabel>
              <Typography gutterBottom>{inputValue.address}</Typography>
              <Divider />
            </Grid>
          </Grid>
          {isEditing ? (
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "flex-end",
                gap: "16px",
              }}
            >
              <Button
                variant="contained"
                color="info"
                type="submit"
                form="medicalRecordForm"
              >
                DONE
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => setIsEditing(false)}
              >
                CANCEL
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: 2,
                height: "36.5px",
              }}
            ></Box>
          )}
        </Box>
      ) : (
        <Box
          height={390}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
