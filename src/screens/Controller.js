import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";

const Controller = () => {
  const baseUrl = "http://localhost:8080/";

  return (
    <>
    <AuthContextProvider>
      <Router>
        <div className="main-container">
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} baseUrl={baseUrl} />}
          />
        </div>
      </Router>
    </AuthContextProvider>
    </>
  );
};

export default Controller;
