import React from "react";
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  CardMedia,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  HomeOutlined,
  PeopleOutline,
  DeveloperBoardOutlined,
  TodayOutlined,
  ExitToAppOutlined,
} from "@mui/icons-material";
import { useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";
import Logo from "../assets/images/logo.png";
import { projectAuth } from "../configs/firebase";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    auth: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    root: {
      display: "flex",
    },
    page: {
      width: "100%",
      paddingTop: theme.spacing(2),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4 !important",
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      justifyContent: "center",
      height: "72px",
      width: `calc(100% - ${drawerWidth}px) !important`,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(1),
    },
  };
});

export default function Layout({ children }) {
  const navigate = useHistory();
  React.useEffect(() => {
    projectAuth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        navigate.push("/auth");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const isAuth = location.pathname === "/auth" ? true : false;

  const menuItems = [
    {
      text: "Home",
      icon: <HomeOutlined color="secondary" />,
      path: "/",
    },

    {
      text: "Patients",
      icon: <PeopleOutline color="secondary" />,
      path: "/patients",
    },
    {
      text: "Devices",
      icon: <DeveloperBoardOutlined color="secondary" />,
      path: "/devices",
    },
  ];

  return (
    <>
      {isAuth ? (
        <div>{children}</div>
      ) : (
        <div className={classes.root}>
          {/* app bar */}
          <AppBar className={classes.appbar} elevation={1}>
            <Toolbar>
              <Typography variant="h5" className={classes.date}>
                IoT-Based Smart Health Monitoring System
              </Typography>
              <IconButton
                onClick={() => {
                  projectAuth.signOut().then(() => history.push("/auth"));
                }}
              >
                <Box color="#fff">
                  <ExitToAppOutlined color="inherit" fontSize="large" />
                </Box>
              </IconButton>
            </Toolbar>
          </AppBar>
          {/* side drawer */}
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Box display="flex">
              <CardMedia
                component="img"
                src={Logo}
                alt=""
                height={64}
                sx={{
                  objectFit: "contain !important",
                  width: "fit-content",
                  px: "16px",
                }}
              />
              <Typography
                variant="h5"
                fontWeight={600}
                className={classes.title}
                flexGrow={1}
              >
                IHS
              </Typography>
            </Box>

            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  onClick={() => history.push(item.path)}
                  key={item.text}
                  className={
                    location.pathname === item.path ? classes.active : null
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
            <Box
              p="16px"
              display="flex"
              alignItems="center"
              gap="32px"
              marginTop="auto"
            >
              <TodayOutlined />
              <Typography className={classes.date}>
                {format(new Date(), "do MMMM Y")}
              </Typography>
            </Box>
          </Drawer>

          {/* main content */}
          <div className={classes.page}>
            <div className={classes.toolbar}></div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

