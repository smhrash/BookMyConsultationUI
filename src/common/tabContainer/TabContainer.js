import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

const TabContainer = function (props) {
  const { index, value } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
        <Box>{value === index && <div>{props.children}</div>}</Box>
      </Typography>
    </div>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default TabContainer;
