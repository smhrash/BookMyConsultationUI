import React, { useState, useContext } from 'react';
import {
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  CardContent,
  makeStyles,
} from '@material-ui/core';
import Modal from 'react-modal';
import Logo from '../../assets/logo.jpeg';
import { AuthContext } from '../../contexts/AuthContext';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';
import { logoutFetch } from '../../util/fetch';

Modal.setAppElement('#root');

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: 'purple',
    height: '70px',
    padding: '11px',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: '#ff7f7f',
    height: '35px',
    marginRight: theme.spacing(1),
  },
  titleText: {
    color: 'white',
    textAlign: 'left',
    paddingLeft: theme.spacing(1),
    flexGrow: 1,
  },
  buttons: {
    marginLeft: 'auto',
  },
  modalContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #d3d3d3',
    padding: '0px',
  },
  paperContainer: {
    borderRadius: 5,
    padding: theme.spacing(0),
    border: '.1px solid #d3d3d3',
    
  },
  modalTitle: {
    backgroundColor: 'purple',
    color: 'white',
    fontSize: 'x-large',
    padding: theme.spacing(2, 1),
  },
}));

const Header = () => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { userToken, dispatch } = useContext(AuthContext);

  const handleLogin = () => setIsModalOpen(true);
  const handleLogout = async () => {
    await logoutFetch();
    dispatch({ type: 'LOGOUT' });
  };
  const handleTabChange = (event, newValue) => setActiveTab(newValue);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <header className={classes.header}>
      <img src={Logo} alt="Logo" className={classes.logo} />
      <Typography variant="h6" className={classes.titleText}>
        Doctor Finder
      </Typography>
      <div className={classes.buttons}>
        {!userToken || isModalOpen ? (
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={handleModalClose} className={classes.modalContainer}>
        <Paper className={classes.paperContainer}>
          <Typography variant="h6" className={classes.modalTitle}>
            Authentication
          </Typography>
          <CardContent>
            <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="secondary" textColor="primary" centered>
              <Tab label="LOGIN" />
              <Tab label="REGISTER" />
            </Tabs>
            {activeTab === 0 ? <Login modalClose={handleModalClose} /> : <Register modalClose={handleModalClose} />}
          </CardContent>
        </Paper>
      </Modal>
    </header>
  );
};

export default Header;
