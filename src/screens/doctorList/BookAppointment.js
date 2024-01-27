import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Alert } from "@material-ui/lab";
import Modal from "react-modal";
import { Typography, Paper } from "@material-ui/core";

import BookAppointmentModalStyle from "../../common/styles/BookAppointmentModalStyle";
import LoginAlertBookingAppointmentStyle from "../../common/styles/LoginAlertBookingAppointmentStyle";
import BookAppointmentStyle from "../../common/styles/BookAppointmentStyle";

const BookAppointment = (props) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBookingModalClose = () => {
    setBookingModalOpen(false);
    props.setBookAppointmentState(false);
  };

  const handleBookingModalOpen = () => {
    setBookingModalOpen(true);
  };

  const { userToken } = useContext(AuthContext);

  const handleAlertClose = () => {
    props.setBookAppointmentState(false);
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
        </Paper>
      </Modal>
    </>
  );
};

export default BookAppointment;
