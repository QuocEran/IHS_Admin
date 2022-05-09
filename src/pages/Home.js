import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import DeviceCard from "../components/DeviceCard";
import PatientCard from "../components/PatientCard";
import StatsChart from "../components/StatsChart";
import { projectFirestore } from "../configs/firebase";

import { timeConverter } from "../utilities/timeConvert";
import patient from "../stores/patient";
import device from "../stores/device";
export default function Home() {
  const patients = patient((state) => state.patients);
  const setPatients = patient((state) => state.addPatients);

  const devices = device((state) => state.devices);
  const setDevices = device((state) => state.addDevices);

  const [dataChart, setDataChart] = useState([]);
  const [dataRoom, setDataRoom] = useState({});

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [patientId, setPatientId] = React.useState("");
  const [espId, setEspId] = React.useState("");
  const [isPending, setIsPending] = React.useState(true);

  useEffect(() => {
    projectFirestore.collection("patients").onSnapshot(async (snapshot) => {
      const response = await snapshot.docs.map((doc) => doc.data());
      setPatients(response);
      setEspId(response[0].espId);
      setPatientId(response[0].patientId);
      console.log(espId, patientId);
      handleListItemClick(0, espId, patientId);
    });
    projectFirestore.collection("esp").onSnapshot(async (snapshot) => {
      setDevices(await snapshot.docs.map((doc) => doc.data()));
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsPending(true);
    if ((patientId !== "") & (espId !== "")) {
      projectFirestore
        .collection("espData")
        .doc(espId)
        .collection(patientId)
        .orderBy("TimeStamp", "asc")
        .limitToLast(10)
        .onSnapshot((snapshot) => {
          const lastData = snapshot.docs[snapshot.docs.length - 1];
          if (
            (lastData.data().SP02 < 94) |
            (lastData.data().Temp > 37) |
            (lastData.data().HeartBeat > 100)
          ) {
            setDataRoom({
              Status: "Alert",
              RoomTemp: lastData.data().RoomTemp,
              Humid: lastData.data().Humid,
            });
          } else {
            setDataRoom({
              Status: "Normal",
              RoomTemp: lastData.data().RoomTemp,
              Humid: lastData.data().Humid,
            });
          }

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
    setIsPending(false);
  }, [patientId, espId]);

  const handleListItemClick = (index, espId, patientId) => {
    setSelectedIndex(index);
    setEspId(espId);
    setPatientId(patientId);
  };

  return (
    <Container>
      <Grid container>
        <Grid
          container
          item
          md={4}
          xs={6}
          p={{ sm: 1, xs: 0.5 }}
          sx={{ border: "2px solid #eee" }}
        >
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontWeight={600} variant="h2" color="text.secondary">
              {devices?.length}
            </Typography>
            <Typography fontWeight={600}>Total devices</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontWeight={600} variant="h2" color="primary">
              {patients?.length}
            </Typography>
            <Typography fontWeight={600}>Total Patients</Typography>
          </Grid>
        </Grid>
        {/* List devices */}
        <Grid
          item
          md={8}
          xs={6}
          justifyContent="center"
          alignItems="center"
          p={{ sm: 1, xs: 0.5 }}
          sx={{ border: "2px solid #eee" }}
        >
          <Typography variant="h5">👁️‍🗨️ Devices</Typography>
          <List
            sx={{
              overflow: "auto",
              maxHeight: 400,
            }}
          >
            {devices.map((device, index) => (
              <ListItem key={index}>
                <DeviceCard data={device} />
              </ListItem>
            ))}
          </List>
        </Grid>
        {/* Calendar */}

        {/* Chart */}
        <Grid
          item
          xs={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          p="16px 8px"
          height={400}
          sx={{ border: "2px solid #eee" }}
        >
          {isPending ? (
            <CircularProgress size={60} />
          ) : (
            <StatsChart data={dataChart} dataRoom={dataRoom} />
          )}
        </Grid>
        {/* List patients */}
        <Grid
          item
          xs={4}
          justifyContent="center"
          alignItems="center"
          p={{ sm: 1, xs: 0.5 }}
          sx={{ border: "2px solid #eee" }}
        >
          <Typography variant="h5">🤒 Patients</Typography>
          <List
            sx={{
              overflow: "auto",
              maxHeight: 400,
            }}
          >
            {patients.map((patient, index) => (
              <PatientCard
                key={index}
                index={index}
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
    </Container>
  );
}

