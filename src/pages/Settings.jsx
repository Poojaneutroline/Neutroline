import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Bhours from "../components/Bhours";
import Service from "../components/Service";
import BhoursC from "../components/BHoursC";
import { AppProvider } from "../AppContext";

const Settings = () => {
  return (
    <AppProvider>
    <div>
      <Header />
      <div className="flex relative">
        <Sidebar />
        <div className="px-[80px] py-5 overflow-y-hidden 
       
         ">
          <h1 className="text-[27px] text-[#3F26A5] ">Settings</h1>
        <BhoursC />
        <Service/>
        </div>
        
      </div>
    </div>
    </AppProvider>
  );
};

export default Settings;
