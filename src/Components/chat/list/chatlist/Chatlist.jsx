import React from "react";
import "./chatList.css";

const Chatlist = ({ roomNumber }) => {
  return (
    <div className="chatList">
      <span>Oda : {roomNumber}</span>
    </div>
  );
};

export default Chatlist;
