import Header from "../../common/header/Header";
import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import TabContainer from "../../common/tabContainer/TabContainer";

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
        Doctors
      </TabContainer>
      <TabContainer value={activeTab} index={1}>
        Login to see Appointments
      </TabContainer>
    </div>
  );
};

export default Home;
