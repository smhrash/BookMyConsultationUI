import React, { useContext, useState, useEffect } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { jwtDecode } from "jwt-decode";

import { AuthContext } from "../../contexts/AuthContext";
import { getUserAppointmentFetch } from "../../util/fetch";
import AppointmentStyle from "../../common/styles/AppointmentStyle";
import RateAppointment from "./RateAppointment";

const Appointment = () => {
  const { userToken } = useContext(AuthContext);
  const [userAppointmentData, setUserAppointmentData] = useState([]);
  const [userAppointmentNil, setUserAppointmentNil] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [ratingDetails, setRatingDetails] = useState({});
  const [ratingModalOpen, setRatingModalOpen] = useState(false);

  /**
   * Decodes a JWT token and sets the user email.
   * @param {string} userToken - The JWT token to be decoded.
   * @returns {void}
   */
  const getJWTTokenDecoded = (userToken) => {
    try {
      const decodedToken = jwtDecode(userToken);
      setUserEmail(decodedToken.aud);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Retrieves the user's appointment data using the provided user token and email.
   * @param {string} userToken - The user's authentication token.
   * @param {string} userEmail - The user's email address.
   * @returns {Promise<void>} - A promise that resolves when the appointment data is retrieved.
   */
  const getUserAppointment = async (userToken, userEmail) => {
    const data = await getUserAppointmentFetch(userToken, userEmail);
    if (data.length === 0) {
      setUserAppointmentNil(true);
    } else {
      setUserAppointmentNil(false);
    }
    setUserAppointmentData(data);
  };

  /**
   * Handles the click event for rating an appointment.
   *
   * @param {string} appointmentId - The ID of the appointment.
   * @param {string} doctorId - The ID of the doctor.
   * @returns {void}
   */
  const handleRateAppointmentButtonClick = (appointmentId, doctorId) => {
    setRatingDetails({
      appointmentId: appointmentId,
      doctorID: doctorId,
    });
    setRatingModalOpen(true);
  };

  useEffect(() => {
    if (
      userToken &&
      userToken !== null &&
      userToken !== undefined &&
      userToken !== ""
    ) {
      // Call handleBookingModalOpen inside useEffect to avoid too many renders
      getJWTTokenDecoded(userToken);
    }
  }, [userToken]);

  useEffect(() => {
    if (userEmail !== null && userEmail !== undefined && userEmail !== "") {
      getUserAppointment(userToken, userEmail);
    }
  }, [userToken, userEmail]);

  return (
    <>
      {userToken === null || userToken === undefined || userToken === "" ? (
        <div>Login to see appointments</div>
      ) : (
        <div>
          {userAppointmentNil === false ? (
            userAppointmentData.map((appointment, index) => (
              <Paper key={index} style={AppointmentStyle.paper}>
                <Typography variant="body1" style={AppointmentStyle.doctorName}>
                  Dr: {appointment.doctorName}
                </Typography>
                <Typography
                  variant="body2"
                  style={AppointmentStyle.otherDetails}
                >
                  Date: {appointment.appointmentDate}
                </Typography>
                <Typography
                  variant="body2"
                  style={AppointmentStyle.otherDetails}
                >
                  Symptoms: {appointment.symptoms}
                </Typography>
                <Typography
                  variant="body2"
                  style={AppointmentStyle.otherDetails}
                >
                  priorMedialHistory: {appointment.priorMedicalHistory}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={AppointmentStyle.rateAppointmentButton}
                  onClick={() =>
                    handleRateAppointmentButtonClick(
                      appointment.appointmentId,
                      appointment.doctorId
                    )
                  }
                >
                  Rate Appointment
                </Button>
              </Paper>
            ))
          ) : (
            <div>No Appointment Done</div>
          )}
          {ratingModalOpen === true ? (
            <RateAppointment
              ratingDetails={ratingDetails}
              setRatingModalOpen={setRatingModalOpen}
              ratingModalOpen={ratingModalOpen}
            />
          ) : null}
        </div>
      )}
    </>
  );
};

export default Appointment;
