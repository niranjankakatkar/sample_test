
import * as React from "react";
import Services from "./Service";
import ServiceLeadDetails from "./ServiceLeadDetails";
import Navbar from "../Navbar";

const Service = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="main-wrapper">
    <Navbar></Navbar>
    <div className="page-wrapper">
   
    </div>
    </div>
  );
};

export default Service;
