import React from "react";
import { Paper, Typography, CardContent } from "@material-ui/core";
import ViewDoctorDetailsStyle from "../../common/styles/ViewDoctorDetailsStyle";
import RatingStars from "../../common/RatingStars/RatingStars";

const DoctorDetails = (props) => {
  return (
    <Paper>
      <div style={ViewDoctorDetailsStyle.paper}>
        <Typography style={ViewDoctorDetailsStyle.headerDoctors}>
          Doctor Details
        </Typography>
      </div>

      <div>
        <CardContent>
          <Typography style={ViewDoctorDetailsStyle.doctorName}>
            Dr: {props.doctor.firstName} {props.doctor.lastName}
          </Typography>
          <Typography style={ViewDoctorDetailsStyle.doctorDetails}>
            Total Experience: {props.doctor.totalYearsOfExp}{" "}
            {props.doctor.totalYearsOfExp > 1 ? "years" : "year"}
          </Typography>
          <Typography style={ViewDoctorDetailsStyle.doctorDetails}>
            Speciality: {props.doctor.speciality}
          </Typography>
          <Typography style={ViewDoctorDetailsStyle.doctorDetails}>
            Date of Birth: {props.doctor.dob}
          </Typography>
          <Typography style={ViewDoctorDetailsStyle.doctorDetails}>
            City: {props.doctor.address.city}
          </Typography>
          <Typography style={ViewDoctorDetailsStyle.doctorDetails}>
            Email: {props.doctor.emailId}
          </Typography>
          <Typography style={ViewDoctorDetailsStyle.doctorDetails}>
            Mobile: {props.doctor.mobile}
          </Typography>
          <Typography style={ViewDoctorDetailsStyle.doctorDetails}>
            Rating: <RatingStars rating={props.doctor.rating} />
          </Typography>
        </CardContent>
      </div>
    </Paper>
  );
};

export default DoctorDetails;
