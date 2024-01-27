import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { AuthContextProvider } from "../contexts/AuthContext";

const appTheme = createTheme({
  typography: {
    body1: {
      fontSize: 17,
    },
    body2: {
      fontSize: 13,
    },
    caption: {
      fontSize: 13,
      fontWeight: 600,
    },
  },

  palette: {
    primary: {
      main: "#1565c0",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const Controller = () => {
  const baseUrl = "http://localhost:8080/";

  return (
    <AuthContextProvider>
      <ThemeProvider theme={appTheme}>
        <Router>
          <div className="main-container">
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} baseUrl={baseUrl} />}
            />
          </div>
        </Router>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default Controller;
