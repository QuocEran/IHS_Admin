import { Create, Delete } from "@mui/icons-material";
import {
  Grid,
  List,
  Box,
  CircularProgress,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeviceComponents from "../components/DeviceComponents";
import DeviceListItem from "../components/DeviceListItem";
import device from "../stores/device";
import CreateDevice from "../components/CreateDevice";
import DeleteDevice from "../components/DeleteDevice";

export default function Device() {
  const devices = device((state) => state.devices);
  const currDevice = device((state) => state.currDevice);
  const setCurrDecvice = device((state) => state.addCurrDevice);
  const [isPending, setIsPending] = useState(true);
  useEffect(
    () => {
      device
        .getState()
        .getDevices()
        .then(() => {
          setCurrDecvice(0);
          setIsPending(false);
        });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (index) => {
    setIsPending(true);
    setSelectedIndex(index);
    setCurrDecvice(index);
    setIsPending(false);
  };
  //

  // Dialog Create
  const [openCreate, setOpenCreate] = React.useState(false);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  // Dialog Delete
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <Grid container>
      <DeleteDevice
        open={openDelete}
        handleClose={handleCloseDelete}
        setIsPending={setIsPending}
      />
      <CreateDevice open={openCreate} handleClose={handleCloseCreate} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<Create />}
          tooltipTitle="Create New Device"
          onClick={handleClickOpenCreate}
        />
        <SpeedDialAction
          icon={<Delete />}
          tooltipTitle="Delete Device"
          onClick={handleClickOpenDelete}
        />
      </SpeedDial>
      <Grid item xs={8} p={1} display="flex" flexDirection="column" gap="16px">
        {isPending ? (
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
          <DeviceComponents espId={currDevice?.espId} />
        )}
      </Grid>
      <Grid
        item
        xs={4}
        p={1}
        sx={{
          p: 0,
          borderLeft: "1px solid rgba(16, 33, 125, 0.08)",
        }}
      >
        <List sx={{ p: 0 }}>
          {devices.map((device, index) => (
            <DeviceListItem
              espId={device?.espId}
              key={index}
              index={index}
              selectedIndex={selectedIndex}
              handleListItemClick={handleListItemClick}
              patientId={device?.patientId}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
