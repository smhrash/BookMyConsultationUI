import React, { useContext, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.jpeg";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { useLogout } from "../hooks/useLogout";
import Modal from "react-modal";
import { Paper } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import ModalStyle from "../styles/ModalStyle";
import TabPanel from "../tabs/TabPanel";
import TabContainer from "../tabContainer/TabContainer";
import Login from "../../screens/login/Login";

Modal.setAppElement(document.getElementById("root"));

/**
 * Represents the header component of the application.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => {
  // Retrieve userToken and dispatch from AuthContext using useContext hook
  const { userToken, dispatch } = useContext(AuthContext);

  // Define state variables for open and value
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  // Retrieve logout function from useLogout hook
  const { logout } = useLogout();

  /**
   * Handles the logout process.
   * Removes access-token, emailId, appointmentId, and doctorId from sessionStorage.
   * Calls the logout function and dispatches a "LOGOUT" action.
   * @returns {Promise<void>} A promise that resolves when the logout process is complete.
   */
  const handleLogout = async () => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("emailId");
    sessionStorage.removeItem("appointmentId");
    sessionStorage.removeItem("doctorId");
    logout();
    dispatch({ type: "LOGOUT" });
  };

  /**
   * Closes the modal.
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Opens the modal.
   */
  const handleOpen = () => {
    setOpen(true);
  };

  /**
   * Handles the change event of the Tabs component.
   * Updates the value state variable.
   * @param {object} event - The event object.
   * @param {number} newValue - The new value of the Tabs component.
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <header className="header">
        <img src={logo} alt="Bookmyconsultation Logo" />
        <span id="header-title">Doctor Finder</span>
        {!userToken || open ? (
          <div className="login-button">
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Login
            </Button>
          </div>
        ) : (
          <div className="logout-button">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </header>

      <Modal isOpen={open} onRequestClose={handleClose} style={ModalStyle}>
        <Paper>
          <div className="typography">
            <p>Authentication</p>
          </div>
          <CardContent>
            <TabContainer>
              <Tabs
                aria-label="Login and Register"
                value={value}
                centered
                TabIndicatorProps={{ style: { background: "#F50057" } }}
                onChange={handleChange}
              >
                <Tab label="Login"></Tab>
                <Tab label="Register"></Tab>
              </Tabs>
            </TabContainer>
            <TabPanel value={value} index={0}>
              <Login></Login>
            </TabPanel>
            <TabPanel value={value} index={1}></TabPanel>
          </CardContent>
        </Paper>
      </Modal>
    </div>
  );
};

export default Header;
