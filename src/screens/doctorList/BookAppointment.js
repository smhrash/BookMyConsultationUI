import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Alert } from "@material-ui/lab";
import Modal from "react-modal";

import LoginAlertBookingAppointmentStyle from "../../common/styles/LoginAlertBookingAppointmentStyle";

const BookAppointment = (props) => {
  const { userToken } = useContext(AuthContext);

  const handleAlertClose = () => {
    props.setBookAppointmentState(false);
  };
  return (
    <div>
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
    </div>
  );
};

export default BookAppointment;
