import React, { useState, useEffect } from "react";
import {
  Typography,
  MenuItem,
  TextField,
  Paper,
  Button,
} from "@material-ui/core";

import "./Doctor.css";
import Modal from "react-modal";

import {
  getAllDoctorSpecialityFetch,
  getAllDoctorsFetch,
  getAllDoctorsBySpecialityFetch,
} from "../../util/fetch";

import RatingStars from "../../common/RatingStars/RatingStars";
import DoctorDetails from "./DoctorDetails";
import BookAppointment from "./BookAppointment";

import ViewDoctorDetailsModalStyle from "../../common/styles/ViewDoctorDetailsModalStyle";
import ButtonStyles from "../../common/styles/ButtonStyles";

const DoctorList = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [doctorAllSpecialityData, setDoctorAllSpecialityData] = useState([]);
  const [doctorListData, setDoctorListData] = useState([]);
  const [doctor, setDoctor] = useState({});

  const [doctorDetailsModalOpen, setDoctorDetailsModalOpen] = useState(false);

  const [bookAppointmentState, setBookAppointmentState] = useState(false);

  const getAllDoctorSpeciality = async () => {
    const data = await getAllDoctorSpecialityFetch();
    setDoctorAllSpecialityData(data);
  };

  const getAllDoctors = async () => {
    const data = await getAllDoctorsFetch();
    setDoctorListData(data);
  };

  useEffect(() => {
    getAllDoctorSpeciality();
    getAllDoctors();
  }, []);

  useEffect(() => {
    console.log(bookAppointmentState);
  }, [bookAppointmentState]);

  const handleSelectedSpecalityChange = async (e) => {
    let speciality = e.target.value;
    setSelectedSpeciality(speciality);

    const data = await getAllDoctorsBySpecialityFetch(speciality);
    setDoctorListData(data);
  };

  const handleModalClose = () => {
    setDoctorDetailsModalOpen(false);
  };

  const handleBookAppointmentButtonClick = (doctor) => {
    setBookAppointmentState(true);
    setDoctor(doctor);
  };

  return (
    <div>
      <div className="select-header">
        <Typography variant="caption">Select Speciality:</Typography>
        <TextField
          select
          defaultValue=""
          value={selectedSpeciality}
          variant="filled"
          className="select-speciality"
          style={{ minWidth: 200 }}
          onChange={handleSelectedSpecalityChange}
        >
          {doctorAllSpecialityData.map((speciality, index) => (
            <MenuItem value={speciality} key={index}>
              {speciality}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="doctor-list">
        {doctorListData.map((doctor, index) => (
          <Paper className="doctor-card" key={index} square>
            <Typography variant="body1">
              Doctor Name : {doctor.firstName + " " + doctor.lastName}
            </Typography>
            <br></br>
            <Typography variant="body2">
              Speciality : {doctor.speciality}
            </Typography>
            <Typography variant="body2">
              Rating : <RatingStars rating={doctor.rating}></RatingStars>
            </Typography>
            <div className="button-container">
              <Button
                style={ButtonStyles.bookAppointmentButton}
                onClick={() => {
                  handleBookAppointmentButtonClick(doctor);
                }}
              >
                Book Appointment
              </Button>
              <Button
                variant="contained"
                style={ButtonStyles.viewDoctorDetailsButton}
                onClick={() => {
                  setDoctorDetailsModalOpen(true);
                  setDoctor(doctor);
                }}
              >
                View Details
              </Button>
            </div>
          </Paper>
        ))}
      </div>
      {bookAppointmentState && (
        <BookAppointment
          doctor={doctor}
          key={doctor.doctorId}
          setBookAppointmentState={setBookAppointmentState}
        ></BookAppointment>
      )}

      <Modal
        isOpen={doctorDetailsModalOpen}
        onRequestClose={handleModalClose}
        style={ViewDoctorDetailsModalStyle}
      >
        <DoctorDetails doctor={doctor} key={doctor.doctorId}></DoctorDetails>
      </Modal>
    </div>
  );
};

export default DoctorList;
