import React from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";

const SnackBarAlert = (props) => {
  return (
    <Snackbar
      open
      message="Please fill out this field"
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        marginTop: "5px",
      }}
    >
      <SnackbarContent
        style={{
          minWidth: "fit-content",
          maxWidth: "240px", // Adjust the maxWidth as needed
          padding: "8px",
        }}
        message={props.message}
      />
    </Snackbar>
  );
};

export default SnackBarAlert;
