import React, { useState, useContext } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import "./Login.css";
import { AuthContext } from "../../contexts/AuthContext";
import { loginFetch } from "../../util/fetch";

import SnackBarAlert from "../../common/SnackBar/SnackBarAlert";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailBlank, setEmailBlank] = useState(false);
  const [passwordBlank, setPasswordBlank] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [unAuthorizedAlert, setUnAuthorizedAlert] = useState(false);

  const { dispatch } = useContext(AuthContext);

  // need this flag to check if the pattern validation is passing
  let flag = false;

  const [emailPatternValidate, setEmailPatternValidate] = useState(false);
  /**
   * Handles the change event for the email input field.
   * @param {Object} e - The event object.
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Handles the change event of the password input field.
   * @param {Object} e - The event object.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Checks if the given email matches the specified email pattern.
   * @param {string} email - The email to be checked.
   * @returns {boolean} - Returns true if the email matches the pattern, false otherwise.
   */
  const checkEmailPattern = (email) => {
    const emailPattern =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]+)$/i;
    if (emailPattern.test(email) === false) {
      setEmailPatternValidate(true);
      return false;
    } else {
      setEmailPatternValidate(false);
      return true;
    }
  };

  /**
   * Handles the form submission for login.
   *
   * @param {Event} e - The form submission event.
   * @returns {Promise<void>} - A promise that resolves when the login process is complete.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailBlank = email.length === 0;
    setEmailBlank(isEmailBlank);

    const isPasswordBlank = password.length === 0;
    setPasswordBlank(isPasswordBlank);

    flag = checkEmailPattern(email);

    //call the API only if emailPatternValidate is true && emailBlank & passwordBlank are false
    if (flag && !isEmailBlank && !isPasswordBlank) {
      const data = await loginFetch(email, password);
      if (data.accessToken) {
        setLoggedIn(true);
        dispatch({ type: "LOGIN", payload: data.accessToken });

        sessionStorage.setItem("access-token", data.accessToken);
        sessionStorage.setItem("emailId", data.emailAddress);
        setTimeout(() => {
          window.location.href = "/";
          props.handleModalClose();
        }, 1000);
      } else if (data === "error") {
        setLoggedIn(false);
        setUnAuthorizedAlert(true);
      }
    }
  };

  return (
    <div>
      <form
        autoComplete="off"
        noValidate
        className="login-container"
        onSubmit={handleSubmit}
      >
        {/* Email Section */}
        <div className="margin-container-login">
          <FormControl variant="standard" required>
            <InputLabel htmlFor="email" shrink={false}>
              Email
            </InputLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              style={{ width: "100%", marginTop: "50px" }}
              onFocus={() => {
                setEmailPatternValidate(false);
                setUnAuthorizedAlert(false);
                setEmailBlank(false);
              }}
            ></Input>
            {emailPatternValidate === true && email.length > 0 && (
              <FormHelperText style={{ color: "red", fontWeight: 200 }}>
                Enter Valid Email
              </FormHelperText>
            )}
            {email.length === 0 && emailBlank && (
              <SnackBarAlert message="Please fill out this field" />
            )}
          </FormControl>
        </div>

        {/* Password Section */}
        <div className="margin-container-login">
          <FormControl variant="standard" required>
            <InputLabel htmlFor="password" shrink={false}>
              Password
            </InputLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => {
                setUnAuthorizedAlert(false);
                setPasswordBlank(false);
              }}
              style={{ width: "100%", marginTop: "50px" }}
            ></Input>
            {password.length === 0 && passwordBlank && (
              <SnackBarAlert message="Please fill out this field" />
            )}
          </FormControl>
        </div>
        {loggedIn && (
          <Alert variant="filled" severity="success">
            Login Successful
          </Alert>
        )}
        {unAuthorizedAlert && (
          <Alert variant="filled" severity="error">
            Invalid Credentials
          </Alert>
        )}
        {/* Button Section */}
        <div className="button-margin-container-login">
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
