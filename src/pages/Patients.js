import { Avatar, Box, Grid, List, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import PatientInfo from "../components/PatientInfo";
import StatsInfo from "../components/StatsInfo";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import medicalCheckup from "../assets/images/medical-checkup.png";
import pieChart from "../assets/images/pie-chart.png";
import PatientCard from "../components/PatientCard";
import { projectFirestore } from "../configs/firebase";
import { timeConverter } from "../utilities/timeConvert";
import patient from "../stores/patient";
import PatientMedicalRecord from "../components/PatientMedicalRecord";

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
  const patients = patient((state) => state.patients);
  const setPatients = patient((state) => state.addPatients);

  const [currPatient, setCurrPatient] = useState(null);
  const [lastData, setLastData] = useState(null);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    projectFirestore.collection("patients").onSnapshot(async (snapshot) => {
      setPatients(await snapshot.docs.map((doc) => doc.data()));
      setCurrPatient(patients[0]);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currPatient !== null) {
      projectFirestore
        .collection("espData")
        .doc(currPatient.espId)
        .collection(currPatient.patientId)
        .orderBy("TimeStamp", "asc")
        .limitToLast(14)
        .onSnapshot((snapshot) => {
          const lastData = snapshot.docs[snapshot.docs.length - 1];
          setLastData(lastData.data());
          setDataChart(
            snapshot.docs.map((doc) => ({
              name: timeConverter(doc.id),
              SPO2: doc.data().SPO2,
              HeartBeat: doc.data().HeartBeat,
              Temp: doc.data().Temp,
            }))
          );
        });
    }
  }, [currPatient]);

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [isEditing, setIsEditing] = React.useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setCurrPatient(patients[index]);
  };
  return (
    <Grid container height="100vh">
      <Grid item xs={9} p={1} display="flex" flexDirection="column" gap="16px">
        <PatientInfo data={currPatient} />
        <StatsInfo data={lastData} />
        <Box className={classes.content}>
          <Box display="flex" gap="16px" alignItems="center" marginBottom={2}>
            <Avatar variant="rounded" src={pieChart} alt=""></Avatar>
            <Typography variant="h6">Monitoring Stats</Typography>
          </Box>

          <Box height={300}>
            <ResponsiveContainer>
              <LineChart data={dataChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="SPO2" stroke="#8884d1" />
                <Line type="monotone" dataKey="HeartBeat" stroke="#8884d8" />
                <Line type="monotone" dataKey="Temp" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
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
              index={index}
              handleListItemClick={handleListItemClick}
              selectedIndex={selectedIndex}
              phone={patient.phoneNumber}
              name={patient.name}
              diagnostic={patient.diagnostic}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
