import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import FieldValidationSnackbar from "../../common/fieldValidationSnackbar/FieldValidationSnackbar";
import { registerFetch, loginFetch } from "../../util/fetch";
import { Alert } from "@material-ui/lab";

// makeStyles hook to define styles
const useStyles = makeStyles((theme) => ({
  marginContainerRegister: {
    marginBottom: 20,
  },
  registerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonMarginContainerRegister: {
    marginTop: 10,
  },
}));

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [firstNameBlank, setFirstNameBlank] = useState(false);
  const [lastNameBlank, setLastNameBlank] = useState(false);
  const [emailIdBlank, setEmailIdBlank] = useState(false);
  const [passwordBlank, setPasswordBlank] = useState(false);
  const [mobileNumberBlank, setMobileNumberBlank] = useState(false);

  const [emailPatternValidate, setEmailPatternValidate] = useState(false);
  const [mobileNumberPatternValidate, setMobileNumberPatternValidate] =
    useState(false);
  const [attemptedRegister, setAttemptedRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { dispatch } = useContext(AuthContext);
  // need this flag to check if the pattern validation is passing
  let emailFlag = false;
  let mobileNumberFlag = false;

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
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

  const checkMobileNumberPattern = (mobileNumber) => {
    const mobileNumberPattern = /^\d{10}$/;
    if (mobileNumberPattern.test(mobileNumber) === false) {
      setMobileNumberPatternValidate(true);
      return false;
    } else {
      setMobileNumberPatternValidate(false);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedRegister(true);
    // Reset the registerSuccess state to null on each submit
    setRegisterSuccess(null);
    const isFirstNameBlank = firstName.length === 0;
    const isLastNameBlank = lastName.length === 0;
    const isEmailIdBlank = emailId.length === 0;
    const isPasswordBlank = password.length === 0;
    const isMobileNumberBlank = mobileNumber.length === 0;

    setFirstNameBlank(isFirstNameBlank);
    setLastNameBlank(isLastNameBlank);
    setEmailIdBlank(isEmailIdBlank);
    setPasswordBlank(isPasswordBlank);
    setMobileNumberBlank(isMobileNumberBlank);

    emailFlag = checkEmailPattern(emailId);
    mobileNumberFlag = checkMobileNumberPattern(mobileNumber);

    if (
      emailFlag &&
      mobileNumberFlag &&
      !isFirstNameBlank &&
      !isLastNameBlank &&
      !isEmailIdBlank &&
      !isPasswordBlank &&
      !isMobileNumberBlank
    ) {
      const data = await registerFetch(
        firstName,
        lastName,
        mobileNumber,
        password,
        emailId
      );
      if (data === 200) {
        setRegisterSuccess(true);
        const loginData = await loginFetch(emailId, password);
        if (loginData.accessToken) {
          dispatch({ type: "LOGIN", payload: loginData.accessToken });
          sessionStorage.setItem("access-token", loginData.accessToken);
          sessionStorage.setItem("emailId", loginData.emailAddress);
          const timeoutId = setTimeout(() => {
            window.location.href = "/";
            props.handleModalClose();
          }, 1000);
          return () => clearTimeout(timeoutId);
        }
      } else {
        setRegisterSuccess(false);
      }
    }
  };
  const classes = useStyles();

  return (
    <div>
      <form
        autoComplete="off"
        noValidate
        className={classes.registerContainer}
        onSubmit={handleSubmit}
      >
        {/* First Name Section */}
        <div className={classes.marginContainerRegister}>
          <FormControl variant="standard" required>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              onFocus={() => {
                setFirstNameBlank(false);
              }}
            />
            {firstName.length === 0 && firstNameBlank && (
              <FieldValidationSnackbar message="Please fill out this field" />
            )}
          </FormControl>
        </div>

        {/* Last Name Section */}
        <div className={classes.marginContainerRegister}>
          <FormControl variant="standard" required>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              onFocus={() => {
                setLastNameBlank(false);
              }}
            />
            {lastName.length === 0 && lastNameBlank && (
              <FieldValidationSnackbar message="Please fill out this field" />
            )}
          </FormControl>
        </div>

        {/* Email Id Section */}
        <div className={classes.marginContainerRegister}>
          <FormControl variant="standard" required>
            <InputLabel htmlFor="email">Email Id</InputLabel>
            <Input
              id="email"
              type="text"
              value={emailId}
              onChange={handleEmailChange}
              onFocus={() => {
                setEmailPatternValidate(false);
                setEmailIdBlank(false);
              }}
            />
            {emailPatternValidate === true && emailId.length > 0 && (
              <FormHelperText style={{ color: "red", fontWeight: 200 }}>
                Enter Valid Email
              </FormHelperText>
            )}
            {emailId.length === 0 && emailIdBlank && (
              <FieldValidationSnackbar message="Please fill out this field" />
            )}
          </FormControl>
        </div>

        {/* Password Section */}
        <div className={classes.marginContainerRegister}>
          <FormControl variant="standard" required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onFocus={() => {
                setPasswordBlank(false);
              }}
              onChange={handlePasswordChange}
            />
            {password.length === 0 && passwordBlank && (
              <FieldValidationSnackbar message="Please fill out this field" />
            )}
          </FormControl>
        </div>

        {/* Mobile Number Section */}
        <div className={classes.marginContainerRegister}>
          <FormControl variant="standard" required>
            <InputLabel htmlFor="mobileNumber">Mobile No.</InputLabel>
            <Input
              id="mobileNumber"
              type="text"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              onFocus={() => {
                setMobileNumberPatternValidate(false);
                setMobileNumberBlank(false);
              }}
            />
            {mobileNumberPatternValidate === true &&
              mobileNumber.length > 0 && (
                <FormHelperText style={{ color: "red", fontWeight: 200 }}>
                  Enter valid mobile number
                </FormHelperText>
              )}
            {mobileNumber.length === 0 && mobileNumberBlank && (
              <FieldValidationSnackbar message="Please fill out this field" />
            )}
          </FormControl>
        </div>
        {attemptedRegister && registerSuccess === true ? (
          <Alert variant="filled" severity="success">
            Registration Successful
          </Alert>
        ) : attemptedRegister && registerSuccess === false ? (
          <Alert variant="filled" severity="error">
            Registration Failed
          </Alert>
        ) : null}
        {/* Button Section */}
        <div className={classes.buttonMarginContainerRegister}>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
