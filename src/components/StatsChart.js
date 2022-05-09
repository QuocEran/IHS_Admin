import { Box, Grid, Typography } from "@mui/material";
import React from "react";
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

export default function StatsChart({ data, dataRoom }) {
  return (
    <Grid container height="100%" spacing={1}>
      <Grid item xs={10}>
        <ResponsiveContainer>
          <LineChart data={data}>
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
      </Grid>

      <Grid
        item
        xs={2}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexDirection="column"
      >
        <Box textAlign="center">
          <Typography
            fontWeight={700}
            color={dataRoom.Status === "Alert" ? "error" : "primary"}
          >
            {dataRoom.Status}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Status
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography color="primary" fontWeight={600}>
            {dataRoom.Humid}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Room Humidity
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography color="primary" fontWeight={600}>
            {dataRoom.RoomTemp}&deg;C
          </Typography>
          <Typography variant="subtitle2" color="text.seconday">
            Room Temp
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
