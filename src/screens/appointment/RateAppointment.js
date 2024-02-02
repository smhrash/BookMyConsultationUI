import React, { useState, useContext } from "react";
import Modal from "react-modal";
import {
  Typography,
  FormControl,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { Rating, Alert } from "@material-ui/lab";
import { AuthContext } from "../../contexts/AuthContext";

import RateAppointmentStyle from "../../common/styles/RateAppointmentStyle";
import RateAppointmentModalStyle from "../../common/styles/RateAppointmentModalStyle";
import { postDoctorRatingFetch } from "../../util/fetch";

const RateAppointment = (props) => {
  const { userToken } = useContext(AuthContext);
  const [userSetRating, setUserSetRating] = useState(0);
  const [comments, setComments] = useState("");
  const [ratingSelectionError, setRatingSelectionError] = useState(false);
  const [ratingSuccess, setRatingSuccess] = useState(false);

  /**
   * Closes the modal and resets the rating state.
   */
  const handleModalClose = () => {
    props.setRatingModalOpen(false);
    setUserSetRating(0);
    setRatingSelectionError(false);
  };

  /**
   * Handles the change in rating value.
   * @param {Event} event - The event object.
   * @param {number} newValue - The new rating value.
   */
  const handleRatingChange = (event, newValue) => {
    setUserSetRating(newValue);
    if (newValue !== 0 && newValue !== null) {
      setRatingSelectionError(false);
    } else {
      setRatingSelectionError(true);
    }
  };

  /**
   * Handles the change event for the comments input field.
   * @param {Event} event - The change event object.
   */
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  /**
   * Posts the doctor rating to the server.
   * @returns {Promise<void>} A promise that resolves when the rating is successfully posted.
   */
  const postDoctorRating = async () => {
    let postingData = {
      doctorId: props.ratingDetails.doctorID,
      rating: userSetRating,
      comments: comments,
      appointmentId: props.ratingDetails.appointmentId,
    };
    const data = await postDoctorRatingFetch(userToken, postingData);
    if (data !== "error") {
      setRatingSuccess(true);
    } else {
      setRatingSuccess(false);
    }
  };

  /**
   * Handles the click event for the "Rate Appointment" button.
   * If the user has set a rating, it posts the doctor's rating and closes the modal after 3 seconds.
   * If the user has not set a rating, it sets the ratingSelectionError state to true.
   */
  const handleRateAppointmentButtonClick = () => {
    if (userSetRating !== 0 && userSetRating !== null) {
      postDoctorRating();
      setTimeout(() => {
        handleModalClose();
      }, 3000);

      setRatingSelectionError(false);
    } else {
      setRatingSelectionError(true);
    }
  };

  return (
    <Modal
      isOpen={props.ratingModalOpen}
      onRequestClose={handleModalClose}
      style={RateAppointmentModalStyle}
    >
      <Typography style={RateAppointmentStyle.rateAppointmentheader}>
        Rate Appointment
      </Typography>
      <div>
        <FormControl>
          <TextField
            label="Comments"
            variant="standard"
            multiline
            minRows={3}
            style={RateAppointmentStyle.commentsTextField}
            onChange={handleCommentsChange}
          ></TextField>

          <Typography style={RateAppointmentStyle.rateStarSetting}>
            Rating:
            <Rating
              value={userSetRating}
              onChange={handleRatingChange}
              name="doctor-rating"
            />
          </Typography>
          {ratingSelectionError && (
            <FormHelperText
              style={{ marginLeft: "10px", color: "red", fontWeight: 200 }}
            >
              Select a rating
            </FormHelperText>
          )}
        </FormControl>
      </div>
      <Button
        variant="contained"
        color="primary"
        style={RateAppointmentStyle.rateAppointmentButton}
        onClick={handleRateAppointmentButtonClick}
      >
        Rate Appointment
      </Button>
      {ratingSuccess && (
        <Alert
          variant="filled"
          severity="success"
          style={RateAppointmentStyle.rateAppointmentAlert}
        >
          Ratings Submitted
        </Alert>
      )}
    </Modal>
  );
};

export default RateAppointment;
