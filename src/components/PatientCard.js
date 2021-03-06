import React from "react";
import {
  Typography,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItem,
} from "@mui/material";
export default function PatientCard({
  selectedIndex,
  index,
  handleListItemClick,
  diagnostic,
  status,
  phone,
  name,
  espId,
  patientId,
}) {
  return (
    <ListItem
      button
      selected={selectedIndex === index}
      onClick={() => handleListItemClick(index, espId, patientId)}
    >
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            sx={{ display: "inline" }}
            component="span"
            color="text.primary"
            fontWeight={600}
          >
            {name}
          </Typography>
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
              {phone}
            </Typography>{" "}
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="orangeRed"
              fontWeight={500}
            >
              - {diagnostic}
            </Typography>
            <Typography
              component="div"
              variant="body2"
              color={status === "Alert" ? "red" : "primary"}
              fontWeight={800}
              fontSize={16}
            >
              {status}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

