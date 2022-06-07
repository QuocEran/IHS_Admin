import React from "react";
import ava from "../assets/images/logo.png";
import {
  PersonRounded,
  PhoneRounded,
  LocalHospitalRounded,
} from "@mui/icons-material";
import styles from "./PatientInfo.module.css";
import {
  Stack,
  Divider,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function PatientInfo({ data }) {
  const inforUser =
    data === null
      ? null
      : [
          {
            title: "AGE",
            detail: data?.age,
          },
          {
            title: "SEX",
            detail: data?.sex.toUpperCase(),
          },
          {
            title: "BLOOD",
            detail: data?.blood,
          },
          {
            title: "WEIGHT",
            detail: data.weight !== "" ? data.weight + " KG" : null,
          },
          {
            title: "HEIGHT",
            detail: data.height !== "" ? data.height + " CM" : null,
          },
          {
            title: "BMI",
            detail: data?.BMI,
          },
        ];
  return (
    <>
      {data === null ? (
        <Box className={styles.content}>
          <Box
            minHeight="20vh"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        </Box>
      ) : (
        <Box className={styles.content}>
          <img src={ava} alt="" className={styles.avatar} />
          <Grid container>
            <Grid item xs={12} px={1}>
              <Stack
                flexWrap={1}
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <PersonRounded />
                  <Typography>{data?.name}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <PhoneRounded />
                  <Typography>{data?.phoneNumber}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <LocalHospitalRounded />
                  <Typography>{data?.diagnostic}</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid container item xs={12}>
              {inforUser.map((item, index) => (
                <Grid key={index} item md={2} sm={4} xs={6}>
                  <Typography
                    textAlign="center"
                    color="gray"
                    fontWeight={600}
                    varaint="h6"
                  >
                    {item.title}
                  </Typography>
                  <Typography textAlign="center" fontWeight={600} fontSize={18}>
                    {item.detail}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

