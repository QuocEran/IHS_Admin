import React from "react";
import { Box, Typography } from "@mui/material";
import { CalendarPicker, LocalizationProvider } from "@mui/lab";
// import { format } from "date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function HomeCalendar() {
  return (
    <Box>
      <Typography variant="h5">🗓️ Calendar</Typography>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            orientation="landscape"
            openTo="day"
            readOnly={true}
            onChange={() => console.log("abc")}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
}
