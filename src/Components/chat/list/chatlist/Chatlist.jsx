import { useState } from "react";
import "./chatList.css";

const Chatlist = () => {
  const [addMode, setaddMode] = useState(false);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchbar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setaddMode((prev) => !prev)}
        />
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jhon Doe</span>
          <p>Hello </p>
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
