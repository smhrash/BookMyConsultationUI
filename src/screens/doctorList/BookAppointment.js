import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Alert } from "@material-ui/lab";
import Modal from "react-modal";
import {
  Typography,
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import BookAppointmentModalStyle from "../../common/styles/BookAppointmentModalStyle";
import LoginAlertBookingAppointmentStyle from "../../common/styles/LoginAlertBookingAppointmentStyle";
import BookAppointmentStyle from "../../common/styles/BookAppointmentStyle";
import bookAppointmentButton from "../../common/styles/ButtonStyles";

import { getDoctorTimeSlotsFetch } from "../../util/fetch";
import ButtonStyles from "../../common/styles/ButtonStyles";

const BookAppointment = (props) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const date = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = React.useState(date);
  const [doctorTimeSlots, setDoctorTimeSlots] = useState([]);

  const [isSlotEmpty, setIsSlotEmpty] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState("");

  const { userToken } = useContext(AuthContext);

  const handleBookingModalClose = () => {
    setBookingModalOpen(false);
    props.setBookAppointmentState(false);
  };

  const handleAlertClose = () => {
    props.setBookAppointmentState(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const getDoctorTimeSlots = async () => {
    const data = await getDoctorTimeSlotsFetch(props.doctor.id, selectedDate);
    if (data !== "error") {
      if (data.timeSlot.length > 0) {
        setIsSlotEmpty(false);
      } else {
        setIsSlotEmpty(true);
      }
      setDoctorTimeSlots(data.timeSlot);
    }
  };

  const handleBookingModalOpen = () => {
    setBookingModalOpen(true);
  };

  const handleTimeSlotChange = (e) => {
    if (isSlotEmpty) {
      alert("No Slot Available");
    }
    setSelectedSlot(e.target.value);
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
    }
  }, [userToken]);

  useEffect(() => {
    if (
      selectedDate !== null &&
      selectedDate !== undefined &&
      selectedDate !== "" &&
      props.doctor.id !== null &&
      props.doctor.id !== undefined
    ) {
      getDoctorTimeSlots();
    }
  }, [selectedDate, props.doctor.id]);

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
      ) : null}
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
              variant="filled"
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
                value={selectedDate}
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
              >
                {doctorTimeSlots.map((timeSlot, index) => (
                  <MenuItem value={timeSlot} key={index}>
                    {timeSlot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <FormControl>
            <TextField
              label="Medical History"
              multiline
              minRows={4}
              style={BookAppointmentStyle.medicalHistoryStyle}
            ></TextField>
            <TextField
              label="Symptoms"
              multiline
              minRows={4}
              style={BookAppointmentStyle.medicalHistoryStyle}
            ></TextField>
          </FormControl>
          <div>
            <Button style={BookAppointmentStyle.appointmentButton}>
              Book Appointment
            </Button>
          </div>
        </Paper>
      </Modal>
    </>
  );
};

export default BookAppointment;
