import React, { useState, useContext } from "react";
import "./Register.css";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

import SnackBarAlert from "../../common/SnackBar/SnackBarAlert";
import { registerFetch, loginFetch } from "../../util/fetch";
import { Alert } from "@material-ui/lab";

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
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { dispatch } = useContext(AuthContext);
  // need this flag to check if the pattern validation is passing
  let emailFlag = false;
  let mobileNumberFlag = false;

  /**
   * Handles the change event for the first name input field.
   * @param {Object} e - The event object.
   */
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  /**
   * Handles the change event for the last name input field.
   * @param {Object} e - The event object.
   */
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  /**
   * Handles the change event for the email input field.
   * @param {Object} e - The event object.
   */
  const handleEmailChange = (e) => {
    setEmailId(e.target.value);
  };

  /**
   * Handles the change event for the password input field.
   * @param {Object} e - The event object.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Handles the change event for the mobile number input field.
   * @param {Object} e - The event object.
   */
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
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
   * Checks if the given mobile number matches the specified pattern.
   * @param {string} mobileNumber - The mobile number to be validated.
   * @returns {boolean} - Returns true if the mobile number matches the pattern, otherwise false.
   */
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
      }
    }
  };

  return (
    <div>
      <form
        autoComplete="off"
        noValidate
        className="register-container"
        onSubmit={handleSubmit}
      >
        {/* First Name Section */}
        <div className="margin-container-register">
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
              <SnackBarAlert message="Please fill out this field" />
            )}
          </FormControl>
        </div>

        {/* Last Name Section */}
        <div className="margin-container-register">
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
              <SnackBarAlert message="Please fill out this field" />
            )}
          </FormControl>
        </div>

        {/* Email Id Section */}
        <div className="margin-container-register">
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
              <SnackBarAlert message="Please fill out this field" />
            )}
          </FormControl>
        </div>

        {/* Password Section */}
        <div className="margin-container-register">
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
              <SnackBarAlert message="Please fill out this field" />
            )}
          </FormControl>
        </div>

        {/* Mobile Number Section */}
        <div className="margin-container-register">
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
              <SnackBarAlert message="Please fill out this field" />
            )}
          </FormControl>
        </div>
        {registerSuccess && (
          <Alert variant="filled" severity="success">
            Registration Successful
          </Alert>
        )}
        {/* Button Section */}
        <div className="button-margin-container-register">
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
