import React from "react";
import { Box, Avatar, Typography, Grid } from "@mui/material";
import styles from "./StatsInfo.module.css";
import heartbeat from "../assets/images/heartbeat.png";
import temp from "../assets/images/temp.png";
import oxygen from "../assets/images/oxygen.png";
import roomTemp from "../assets/images/room-temp.png";
import humid from "../assets/images/humidity.png";
import { CircularProgress } from "@mui/material";

export default function StatsInfo({ isNotFound, data }) {
  const stats =
    data === null
      ? null
      : [
          {
            image: heartbeat,
            value: data.HeartBeat,
            status:
              data.HeartBeat > 100 || data.HeartBeat < 40 ? "Alert" : "Normal",
            title: "BPM",
          },
          {
            image: temp,
            value: data.Temp,
            status: data.Temp > 37 || data.Temp < 35 ? "Alert" : "Normal",
            title: "\u00b0C",
          },
          {
            image: oxygen,
            value: data.SPO2,
            status: data.SPO2 < 94 ? "Alert" : "Normal",
            title: "SPO2",
          },
          {
            image: roomTemp,
            value: data.RoomTemp,
            status:
              data.RoomTemp > 35 || data.RoomTemp < 15 ? "Alert" : "Normal",
            title: "\u00b0C",
          },
          {
            image: humid,
            value: data.Humid,
            status: data.Humid > 75 || data.Humid < 40 ? "Alert" : "Normal",
            title: "%",
          },
        ];

  return (
    <>
      {isNotFound ? null : (
        <>
          {data === null ? (
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
            <Grid container spacing={1}>
              {stats.map((item, index) => (
                <Grid item md={2.4} key={index}>
                  <Box className={styles.content}>
                    <Typography
                      textAlign="center"
                      color={item.status === "Alert" ? "error" : "primary"}
                      fontWeight={600}
                    >
                      {item.status}
                    </Typography>
                    <Box display="flex" alignItems="center" gap="5px">
                      <Avatar variant="square" src={item.image} alt="" />
                      <Typography fontWeight={600} fontSize={20}>
                        {item.value}
                      </Typography>
                      <Typography fontSize={18}>{item.title}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </>
  );
}

