import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

import React from "react";
import Logo from "../assets/images/logo.png";
import { projectAuth } from "../configs/firebase";
import { useHistory } from "react-router-dom";
export default function SignIn() {
  const history = useHistory();

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [isPending, setIsPending] = React.useState(false);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    //Firebase login
    projectAuth
      .signInWithEmailAndPassword(values.username, values.password)
      .then((auth) => {
        if (auth) {
          setIsPending(false);
          history.push("/");
        }
      })
      .catch((error) => {
        setIsPending(false);
        alert(error.message);
      });
  };
  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center" }}>
      <Box paddingTop={5} width="80%">
        <Avatar
          variant="square"
          src={Logo}
          sx={{
            width: "120px",
            height: "120px",
            objectFit: "contain",
            marginX: "auto",
            marginBottom: "30px",
          }}
        />
        <Typography
          color="primary"
          textAlign="center"
          variant="h5"
          component="div"
        >
          IHS ADMIN
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputLabel htmlFor="username">User name</InputLabel>
          <OutlinedInput
            id="username"
            fullWidth
            value={values.username}
            onChange={handleChange("username")}
          ></OutlinedInput>
          <InputLabel
            sx={{ marginTop: "30px" }}
            htmlFor="outlined-adornment-password"
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Box width="100%" marginX="auto" marginTop="30px">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ height: "56px", fontSize: "18px" }}
            >
              {isPending ? "Loading..." : "Log In"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

