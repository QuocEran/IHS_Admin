import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./layout/layout";
import { createTheme, ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import Device from "./pages/Device";
import SignIn from "./pages/SignIn";

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
              <Home />
            </Route>
            <Route path="/patients">
              <Patients />
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

