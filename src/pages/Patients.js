import { Avatar, Box, Grid, List, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import PatientInfo from "../components/PatientInfo";
import StatsInfo from "../components/StatsInfo";
import { useHistory, useParams } from "react-router-dom";
import medicalCheckup from "../assets/images/medical-checkup.png";
import pieChart from "../assets/images/pie-chart.png";
import PatientCard from "../components/PatientCard";
import { projectFirestore } from "../configs/firebase";

import patient from "../stores/patient";
import PatientMedicalRecord from "../components/PatientMedicalRecord";
import SingleChart from "../components/SingleChart";

const useStyles = makeStyles(() => {
  return {
    selected: {
      backgroundColor: "#ffffff  !important",
    },
    rightContent: {
      borderLeft: "1px solid rgba(16, 33, 125, 0.08)",
    },
    content: {
      borderRadius: "4px",
      border: "2px solid #eee",
      padding: "16px",
      width: "100%",
      height: "max-content",
    },
  };
});

export default function Patients() {
  const params = useParams();
  const history = useHistory();
  const patients = patient((state) => state.patients);
  const setPatients = patient((state) => state.addPatients);
  const [currPatient, setCurrPatient] = useState(null);
  const [patientId, setPatientId] = React.useState("");
  const [espId, setEspId] = React.useState("");
  const [lastData, setLastData] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);
  useEffect(() => {
    projectFirestore.collection("patients").onSnapshot(async (snapshot) => {
      setPatients(await snapshot.docs.map((doc) => doc.data()));
      setCurrPatient(
        patients.find(
          (p) => p.espId === params.espId && p.patientId === params.patientId
        )
      );
    });

    setEspId(params.espId);
    setPatientId(params.patientId);
    setSelectedIndex(params.espId);

    try {
      projectFirestore
        .collection("espData")
        .doc(params.espId)
        .collection(params.patientId)
        .orderBy("TimeStamp", "asc")
        .limitToLast(1)
        .onSnapshot((snapshot) => {
          const lastData = snapshot.docs[0];
          if (lastData) {
            setLastData(lastData.data());
            setIsNotFound(false);
          } else {
            setIsNotFound(true);
          }
        });
    } catch (error) {
      setIsNotFound(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [isEditing, setIsEditing] = React.useState(false);

  const handleListItemClick = (index, espId, patientId) => {
    history.push("/patients/" + espId + "/" + patientId);
    setSelectedIndex(espId);
    window.location.reload();
  };
  return (
    <Grid container height="100vh">
      <Grid item xs={9} p={1} display="flex" flexDirection="column" gap="16px">
        <PatientInfo data={currPatient} />

        <StatsInfo data={lastData} isNotFound={isNotFound} />

        <Box className={classes.content}>
          <Box display="flex" gap="16px" alignItems="center" marginBottom={2}>
            <Avatar variant="rounded" src={pieChart} alt=""></Avatar>
            <Typography variant="h6">Monitoring Stats</Typography>
          </Box>
          <SingleChart espId={espId} patientId={patientId} />
        </Box>
        <Box
          className={classes.content}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Avatar variant="rounded" src={medicalCheckup} alt=""></Avatar>
              <Typography variant="h6">Medical Record</Typography>
            </Box>

            {isEditing ? null : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="contained" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </Box>
            )}
          </Box>
          {currPatient ? (
            <PatientMedicalRecord
              patientId={currPatient?.patientId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          ) : null}
        </Box>
      </Grid>
      <Grid item xs={3} className={classes.rightContent}>
        <List sx={{ p: 0 }}>
          {patients.map((patient, index) => (
            <PatientCard
              key={index}
              index={patient.espId}
              handleListItemClick={handleListItemClick}
              selectedIndex={selectedIndex}
              phone={patient.phoneNumber}
              name={patient.name}
              diagnostic={patient.diagnostic}
              espId={patient.espId}
              patientId={patient.patientId}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

