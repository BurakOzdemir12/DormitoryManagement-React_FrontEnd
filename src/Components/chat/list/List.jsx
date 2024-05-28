import React, { useEffect, useState } from "react";
import "./list.css";
import Userinfo from "./userinfo/Userinfo";
import Chatlist from "./chatlist/Chatlist"; // Chatlist bileşenini içe aktar
import { fetchUserInfo } from "../../../data/api"; // fetchUserInfo fonksiyonunu içe aktar

const List = () => {
  const [userRoom, setUserRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserRoom = async () => {
      try {
        const userData = await fetchUserInfo();
        setUserRoom(userData.roomNumber);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setLoading(false);
      }
    };

    getUserRoom();
  }, []);

  return (
    <div className="list">
      <Userinfo />
      <hr />
      {loading ? (
        <p>Yurt odası yükleniyor...</p>
      ) : userRoom ? (
        <Chatlist roomNumber={userRoom} />
      ) : (
        <p>Yurt odası yüklenemedi.</p>
      )}
    </div>
  );
};

export default List;
