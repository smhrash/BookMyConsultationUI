import React from "react";
import { Star } from "@material-ui/icons";

const RatingStars = ({ rating }) => {
  const maxRating = 5; 
  const filledStars = Math.round(rating); // Number of filled stars
  const emptyStars = maxRating - filledStars; // Number of empty stars

  return (
    <>
      {[...Array(filledStars)].map((_, index) => (
        <Star key={index} style={{ color: "#FFD700" }} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Star key={index} style={{ color: "gray" }} />
      ))}
    </>
  );
};

export default RatingStars;
