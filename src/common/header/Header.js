import "./Header.css";
import React, { useState, useContext } from "react";
import {
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  CardContent,
} from "@material-ui/core";
import Logo from "../../assets/logo.jpeg";
import { AuthContext } from "../../contexts/AuthContext";
import Modal from "react-modal";
import TabContainer from "../tabContainer/TabContainer";
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";
import { logoutFetch } from "../../util/fetch";

Modal.setAppElement("#root");

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  //used to get the userToken and if any dispatch
  //the action to be sent to the reducder which will caseswitch
  const { userToken, dispatch } = useContext(AuthContext);

  /**
   * Handles the login action.
   */
  const handleLogin = () => {
    setModalOpen(true);
  };

  /**
   * Handles the logout functionality.
   * @async
   * @function handleLogout
   * @returns {Promise<void>}
   */
  const handleLogout = async () => {
    await logoutFetch();
    dispatch({ type: "LOGOUT" });
  };

  /**
   * Handles the change of the active tab.
   *
   * @param {Event} event - The event object.
   * @param {number} newValue - The new value of the active tab.
   */
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  /**
   * Closes the modal.
   */
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <header className="header-container">
      <img className="header-logo" src={Logo} alt="Logo" />
      <Typography variant="h6" className="header-title-text">
        Doctor Finder
      </Typography>
      {!userToken || modalOpen ? (
        <div className="header-buttons">
          <Button
            variant="contained"
            color="primary"
            className="header-login-button"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      ) : (
        <div className="header-buttons">
          <Button
            variant="contained"
            color="secondary"
            className="header-logout-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleModalClose}
        className="modal-container"
      >
        <Paper className="paper-container">
          <Typography variant="h6" className="modal-title">
            Authentication
          </Typography>
          <CardContent>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="primary"
              centered
            >
              <Tab label="LOGIN" />
              <Tab label="REGISTER" />
            </Tabs>
            <TabContainer value={activeTab} index={0}>
              <Login modalClose={handleModalClose}></Login>
            </TabContainer>
            <TabContainer value={activeTab} index={1}>
              <Register modalClose={handleModalClose}></Register>
            </TabContainer>
          </CardContent>
        </Paper>
      </Modal>
    </header>
  );
};

export default Header;
