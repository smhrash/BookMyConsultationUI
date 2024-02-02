import React from "react";
import { Star } from "@material-ui/icons";

/**
 * Renders a component that displays a rating using stars.
 *
 * @param {Object} props - The component props.
 * @param {number} props.rating - The rating value.
 * @returns {JSX.Element} The rendered RatingStars component.
 */
const RatingStars = ({ rating }) => {
  const maxRating = 5; // Maximum rating you want to display
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
