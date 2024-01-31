import Header from "../../common/header/Header";
import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import TabContainer from "../../common/tabContainer/TabContainer";
import DoctorList from "../../screens/doctorList/DoctorList";
import Appointment from "../../screens/appointment/Appointment";

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Header></Header>
      <Tabs
        variant="fullWidth"
        value={activeTab}
        indicatorColor="primary"
        onChange={handleTabChange}
        centered
      >
        <Tab label="Doctors"></Tab>
        <Tab label="Appointment"></Tab>
      </Tabs>
      <TabContainer value={activeTab} index={0}>
        <DoctorList />
      </TabContainer>
      <TabContainer value={activeTab} index={1}>
        <Appointment />
      </TabContainer>
    </div>
  );
};

export default Home;
