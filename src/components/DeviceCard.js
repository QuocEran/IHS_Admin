import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import logo from "../assets/images/logo.png";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ContactPageIcon from "@mui/icons-material/ContactPage";
export default function DeviceCard({ data }) {
  return (
    <Card sx={{ display: "flex", width: "100%", alignItems: "center" }}>
      <CardContent
        sx={{
          flex: 0.8,
        }}
      >
        <Typography component="span" variant="div">
          <FingerprintIcon
            sx={{
              verticalAlign: "-4px",
            }}
          />
          <Typography
            component="span"
            lineHeight="24px"
            fontWeight={600}
            sx={{
              wordWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            {data?.espId}
          </Typography>
        </Typography>
        <Box marginTop={1}>
          <Typography component="span" variant="div">
            <ContactPageIcon
              sx={{
                verticalAlign: "-4px",
              }}
            />
            <Typography
              component="span"
              lineHeight="24px"
              fontWeight={600}
              sx={{
                wordWrap: "break-word",
                wordBreak: "break-all",
              }}
            >
              {data?.patientId}
            </Typography>
          </Typography>
        </Box>
        <Box marginTop={1}>
          <Typography component="span" variant="body2" color="orangeRed">
            <FmdGoodIcon
              sx={{
                verticalAlign: "-4px",
              }}
            />
            <Typography component="span" lineHeight="24px">
              {data?.location}
            </Typography>
          </Typography>
        </Box>

        {/* <Typography variant="subtitle1" color="text.secondary" component="div">
          Patient ID: {data?.patientId}
        </Typography> */}
      </CardContent>
      <CardMedia
        src={logo}
        component="img"
        alt=""
        sx={{
          flex: "0.2",
          objectFit: "contain",
          width: 80,
        }}
      />
    </Card>
  );
}
