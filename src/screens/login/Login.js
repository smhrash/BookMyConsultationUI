import React, { useContext } from "react";
import "./Login.css";
import {
  Input,
  FormHelperText,
  FormControl,
  Button,
  SnackBar,
  InputLabel,
} from "@material-ui/core";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);

  const loginURL = "http://localhost:8080/auth/login";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();

    const encodedEmailAndPassword = window.btoa(`${email}:${password}`);

    const emailPattern =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]{2,})$/i;


  };

  return (
    <div className="login-container">
      <form autoComplete="off" onSubmit={handleLogin}>
        <FormControl variant="standard">
          <InputLabel htmlFor="username">Email</InputLabel>
          <Input
            id="email"
            type="email"
            onChange={handleEmailChange}
            value={email}
          >
          </Input>
        </FormControl>
        <br />
        <br />
        <FormControl variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            onChange={handlePasswordChange}
            value={password}
          ></Input>
        </FormControl>
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit">
          LOGIN
        </Button>
      </form>
    </div>
  );
};

export default Login;
