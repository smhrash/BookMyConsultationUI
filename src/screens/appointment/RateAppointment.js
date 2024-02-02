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

  const handleModalClose = () => {
    props.setRatingModalOpen(false);
    setUserSetRating(0);
    setRatingSelectionError(false);
  };

  const handleRatingChange = (event, newValue) => {
    setUserSetRating(newValue);
    if (newValue !== 0 && newValue !== null) {
      setRatingSelectionError(false);
    } else {
      setRatingSelectionError(true);
    }
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

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
