import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./layout/layout";
import { createTheme, ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import Device from "./pages/Device";
import SignIn from "./pages/SignIn";
import { Redirect } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#10217d",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home/94:B9:7E:C3:05:64/MEgoX2SEKTTpMHYD1mxNUaC97Rh1" />
            </Route>
            <Route exact path="/home">
              <Redirect to="/home/94:B9:7E:C3:05:64/MEgoX2SEKTTpMHYD1mxNUaC97Rh1" />
            </Route>
            <Route exact path="/home/:espId/:patientId">
              <Home />
            </Route>
            <Route path="/patients/:espId/:patientId">
              <Patients />
            </Route>
            <Route exact path="/patients">
              <Redirect to="/patients/94:B9:7E:C3:05:64/MEgoX2SEKTTpMHYD1mxNUaC97Rh1" />
            </Route>
            <Route path="/devices">
              <Device />
            </Route>
            <Route path="/auth">
              <SignIn />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

