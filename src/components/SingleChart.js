import React, { useState, useEffect, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";
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
import { projectFirestore } from "../configs/firebase";
import { timeConverter } from "../utilities/timeConvert";

export default function SingleChart({ espId, patientId }) {
  const isMounted = useRef(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [dataChart, setDataChart] = useState();
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  useEffect(() => {
    try {
      setDataChart(null);
      projectFirestore
        .collection("espData")
        .doc(espId)
        .collection(patientId)
        .orderBy("TimeStamp", "asc")
        .limitToLast(14)
        .onSnapshot((snapshot) => {
          const lastData = snapshot.docs[snapshot.docs.length - 1];

          if (lastData) {
            if (isMounted.current) {
              setDataChart(
                snapshot.docs.map((doc) => ({
                  name: timeConverter(doc.id),
                  SPO2: doc.data().SPO2,
                  HeartBeat: doc.data().HeartBeat,
                  Temp: doc.data().Temp,
                }))
              );
              setIsNotFound(false);
            }
          }
        });
    } catch (error) {
      isMounted.current && setIsNotFound(true);
    }
  }, [espId, patientId]);
  return (
    <>
      {isNotFound ? null : (
        <>
          {dataChart === null ? (
            <Box
              height={300}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box height={300}>
              <ResponsiveContainer>
                <LineChart data={dataChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="SPO2" stroke="#8884d1" />
                  <Line type="monotone" dataKey="HeartBeat" stroke="#FF0000" />
                  <Line type="monotone" dataKey="Temp" stroke="#4cb373" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </>
      )}
    </>
  );
}

