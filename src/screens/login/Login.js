import React, { useState, useContext } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { AuthContext } from "../../contexts/AuthContext";
import { loginFetch } from "../../util/fetch";
import FieldValidationSnackbar from "../../common/fieldValidationSnackbar/FieldValidationSnackbar";

// makeStyles hook to define styles
const useStyles = makeStyles((theme) => ({
  marginContainerLogin: {
    marginBottom: 20,
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  buttonMarginContainerLogin: {
    marginTop: 20,
  },
}));

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailBlank = email.length === 0;
    setEmailBlank(isEmailBlank);
  
    const isPasswordBlank = password.length === 0;
    setPasswordBlank(isPasswordBlank);
  
    flag = checkEmailPattern(email);
  
    // Reset previous alerts
    setLoggedIn(false);
    setUnAuthorizedAlert(false);
  
    if (flag && !isEmailBlank && !isPasswordBlank) {
      const data = await loginFetch(email, password);
      if (data.accessToken) {
        // Successful login
        setLoggedIn(true);
        dispatch({ type: "LOGIN", payload: data.accessToken });
        sessionStorage.setItem("access-token", data.accessToken);
        sessionStorage.setItem("emailId", email); // Assuming email is returned or using input email
        setTimeout(() => {
          window.location.href = "/";
          props.handleModalClose();
        }, 1000);
      } else {
        // Here, check for specific error types if your API returns them
        setLoggedIn(false);
        setUnAuthorizedAlert(true); // Consider using a more descriptive state or message based on the error
      }
    }
  };
  
  const classes = useStyles();

  return (
    <div>
      <form
        autoComplete="off"
        noValidate
        className={classes.loginContainer}
        onSubmit={handleSubmit}
      >
        {/* Email Section */}
        <div className={classes.marginContainerLogin}>
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
              <FieldValidationSnackbar message="Please fill out this field" />
            )}
          </FormControl>
        </div>

        {/* Password Section */}
        <div className={classes.marginContainerLogin}>
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
              <FieldValidationSnackbar message="Please fill out this field" />
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
        <div className={classes.buttonMarginContainerLogin}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
