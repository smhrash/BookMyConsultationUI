import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Alert } from "@material-ui/lab";
import Modal from "react-modal";
import { jwtDecode } from "jwt-decode";

import {
  Typography,
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormHelperText,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import BookAppointmentModalStyle from "../../common/styles/BookAppointmentModalStyle";
import LoginAlertBookingAppointmentStyle from "../../common/styles/LoginAlertBookingAppointmentStyle";
import BookAppointmentStyle from "../../common/styles/BookAppointmentStyle";

import {
  getDoctorTimeSlotsFetch,
  getUserDetailsFetch,
  bookAppointmentFetch,
} from "../../util/fetch";

const BookAppointment = (props) => {
  let doctorId = props.doctor.id;
  const date = new Date().toISOString().split("T")[0];
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [doctorTimeSlots, setDoctorTimeSlots] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [registeredSuccessAlert, setRegisteredSuccessAlert] = useState(false);

  const [medicalHistory, setMedicalHistory] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const [isSlotEmpty, setIsSlotEmpty] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedSlotError, setSelectedSlotError] = useState(false);

  const { userToken } = useContext(AuthContext);

  const handleMedicalHistoryChange = (e) => {
    setMedicalHistory(e.target.value);
  };

  const handleSymptomsChange = (e) => {
    setSymptoms(e.target.value);
  };

  /**
   * Closes the booking modal and updates the state.
   */
  const handleBookingModalClose = () => {
    setBookingModalOpen(false);
    props.setBookAppointmentState(false);
    setRegisteredSuccessAlert(false);
  };

  /**
   * Closes the alert and updates the book appointment state.
   */
  const handleAlertClose = () => {
    props.setBookAppointmentState(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (
      selectedSlot === "None" ||
      selectedSlot === "" ||
      selectedSlot === null ||
      selectedSlot === undefined
    ) {
      setSelectedSlotError(true);
    } else {
      const data = {
        doctorId: doctorId,
        doctorName: props.doctor.firstName + " " + props.doctor.lastName,
        userId: userEmail,
        userEmailId: userDetails.emailId,
        userName: userDetails.firstName + " " + userDetails.lastName,
        timeSlot: selectedSlot,
        appointmentDate: selectedDate,
        createdDate: new Date().toISOString().split("T")[0],
        priorMedicalHistory: medicalHistory,
        symptoms: symptoms,
      };

      let result = await bookAppointmentFetch(userToken, data);
      if (result !== "error") {
        setRegisteredSuccessAlert(true);
      } else {
        alert("Either the slot is already booked or not available");
        setRegisteredSuccessAlert(false);
      }
    }
  };

  const getDoctorTimeSlots = async (doctorId, selectedDate) => {
    const data = await getDoctorTimeSlotsFetch(doctorId, selectedDate);
    if (data !== "error") {
      if (data.timeSlot.length > 0) {
        setIsSlotEmpty(false);
      } else {
        setIsSlotEmpty(true);
      }

      setDoctorTimeSlots([...data.timeSlot, "None"]);
    }
  };

  /**
   * Opens the booking modal.
   */
  const handleBookingModalOpen = () => {
    setBookingModalOpen(true);
  };

  const handleTimeSlotChange = (e) => {
    if (isSlotEmpty) {
      alert("No Slot Available");
    }
    setSelectedSlot(e.target.value);
    setSelectedSlotError(false);
  };

  const getJWTTokenDecoded = (userToken) => {
    try {
      const decodedToken = jwtDecode(userToken);
      setUserEmail(decodedToken.aud);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserData = async (userEmail, userToken) => {
    const data = await getUserDetailsFetch(userEmail, userToken);
    if (data !== "error") {
      setUserDetails(data);
    }
  };

  useEffect(() => {
    if (
      userToken &&
      userToken !== null &&
      userToken !== undefined &&
      userToken !== ""
    ) {
      // Call handleBookingModalOpen inside useEffect to avoid too many renders
      handleBookingModalOpen();
      getJWTTokenDecoded(userToken);
    }
  }, [userToken]);

  useEffect(() => {
    if (userEmail !== null && userEmail !== undefined && userEmail !== "") {
      getUserData(userEmail, userToken);
    }
  }, [userEmail, userToken]);

  useEffect(() => {
    if (
      selectedDate !== null &&
      selectedDate !== undefined &&
      selectedDate !== "" &&
      doctorId !== null &&
      doctorId !== undefined
    ) {
      getDoctorTimeSlots(doctorId, selectedDate);
    }
  }, [selectedDate, doctorId]);

  useEffect(() => {
    if (
      registeredSuccessAlert &&
      registeredSuccessAlert !== null &&
      registeredSuccessAlert !== undefined
    ) {
      const timeoutId = setTimeout(() => {
        setRegisteredSuccessAlert(false);
        setBookingModalOpen(false);
        props.setBookAppointmentState(false);
        setRegisteredSuccessAlert(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [registeredSuccessAlert, props]);

  return (
    <>
      {userToken === null || userToken === undefined || userToken === "" ? (
        <div style={LoginAlertBookingAppointmentStyle.alertContainer}>
          <Alert
            style={LoginAlertBookingAppointmentStyle.alert}
            variant="filled"
            severity="error"
            onClose={handleAlertClose}
            onClick={handleAlertClose}
          >
            Please Login to access book appointment
          </Alert>
        </div>
      ) : (
        <Modal
          isOpen={bookingModalOpen}
          style={BookAppointmentModalStyle}
          onRequestClose={handleBookingModalClose}
        >
          <Paper>
            <div style={BookAppointmentStyle.card}>
              <Typography style={BookAppointmentStyle.bookAppointmentHeader}>
                Book an Appointment
              </Typography>
            </div>
            <div>
              <TextField
                required
                disabled
                defaultValue={
                  props.doctor.firstName + " " + props.doctor.lastName
                }
                id="standard-required"
                label="Doctor Name"
                variant="standard"
                style={BookAppointmentStyle.doctorName}
              />
            </div>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate || date}
                  onChange={handleDateChange}
                  style={BookAppointmentStyle.datePickStyle}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <FormControl>
                <InputLabel style={BookAppointmentStyle.timeSlotStyle}>
                  Timeslot
                </InputLabel>
                <Select
                  label="TimeSlot"
                  style={BookAppointmentStyle.timeSlotStyle}
                  onChange={handleTimeSlotChange}
                  value={selectedSlot}
                >
                  {doctorTimeSlots.map((timeSlot, index) => (
                    <MenuItem value={timeSlot} key={index}>
                      {timeSlot}
                    </MenuItem>
                  ))}
                </Select>
                {selectedSlotError && (
                  <FormHelperText style={BookAppointmentStyle.timeSlotAlert}>
                    Select a time slot
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <FormControl>
              <TextField
                label="Medical History"
                multiline
                minRows={4}
                style={BookAppointmentStyle.medicalHistoryStyle}
                value={medicalHistory}
                onChange={handleMedicalHistoryChange}
              ></TextField>
              <TextField
                label="Symptoms"
                multiline
                minRows={4}
                style={BookAppointmentStyle.medicalHistoryStyle}
                value={symptoms}
                onChange={handleSymptomsChange}
              ></TextField>
            </FormControl>
            {registeredSuccessAlert && (
              <Alert
                variant="filled"
                severity="success"
                style={{ width: "40%", margin: "auto" }}
              >
                Appointment Booked Successfully
              </Alert>
            )}
            <div>
              <Button
                style={BookAppointmentStyle.appointmentButton}
                onClick={handleBookAppointment}
              >
                Book Appointment
              </Button>
            </div>
          </Paper>
        </Modal>
      )}
    </>
  );
};

export default BookAppointment;
