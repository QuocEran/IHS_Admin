import React from "react";
import { Typography, Box, ListItemText, ListItem } from "@mui/material";
export default function DeviceListItem({
  selectedIndex,
  index,
  handleListItemClick,
  diagnostic,
  phone,
  name,
  espId,
  patientId,
}) {
  return (
    <ListItem
      button
      selected={selectedIndex === index}
      onClick={() => handleListItemClick(index)}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        border="1px solid gray"
        borderRadius="6px"
        marginRight="10px"
        p={1}
      >
        <Typography variant="h6" color="text.secondary">
          ESP
        </Typography>
      </Box>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              color="text.primary"
              fontWeight={600}
            >
              ESP Id:
            </Typography>{" "}
            <Typography
              sx={{ display: "inline" }}
              component="span"
              color="text.primary"
              fontWeight={600}
            >
              {espId}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.secondary"
              fontWeight={500}
            >
              Patient Id:
            </Typography>{" "}
            <Typography
              sx={{
                wordWrap: "break-word",
                wordBreak: "break-all",
              }}
              component="span"
              variant="body2"
              color="orangeRed"
              fontWeight={500}
            >
              {patientId}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
