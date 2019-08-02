import React from "react";
import Profile from "../components/Profile";
import Timeline from "../components/Timeline";
import Messages from "../components/Messages";



function Dashboard() {
  return (
    <div className="dashboard">
      <div className="banner">OUR NAME</div>
      <div className="dashboardBody">
        <Profile />
        <Timeline />
        {/* <Messages id="saaa" /> */}
      </div>
    </div>
  );
}

export default Dashboard;
