import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import List from "./list/List";
import { fetchUserInfo } from "../../data/api";
import axios from "../../data/axiosInstance";
import io from "socket.io-client";
import "./chat.css";
import "./list/list.css";
import "./list/chatlist/chatList.css";
import "./list/userinfo/userInfo.css";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const endRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    fetchRoomInfo();

    // Socket.IO bağlantısını oluştur
    socket.current = io("http://localhost:8000");

    // Socket.IO üzerinden gelen mesajları dinle
    socket.current.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    // Component kaldırıldığında Socket.IO bağlantısını kapat
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleEmoji = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
    setOpen(false);
  };

  const sendMessage = async () => {
    if (text.trim() === "") {
      return; // Mesaj boşsa, fonksiyonu durdur
    }
  
    try {
      const userInfo = await fetchUserInfo();
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      const currentTime = `${currentDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      const timestamp = `${formattedDate} ${currentTime}`;
  
      // Sunucuya mesajı gönder
      socket.current.emit("message", {
        dormId: userInfo.dormId,
        roomId: userInfo.roomId,
        studentName: `${userInfo.firstName} ${userInfo.lastName}`,
        roomNumber: userInfo.roomNumber,
        timestamp: timestamp,
        text: text,
      });
  
      setText("");
  
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          dormId: userInfo.dormId,
          roomId: userInfo.roomId,
          studentName: `${userInfo.firstName} ${userInfo.lastName}`,
          roomNumber: userInfo.roomNumber,
          timestamp: timestamp,
          text: text,
          ownMessage: true,
        },
      ]);
  
      // Yeni mesaj eklendikten sonra son mesajı görüntüleyin
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  const fetchMessages = async (roomId, roomNumber) => {
    try {
      // Sunucudan mesajları al
      const response = await axios.get(`/messages/${roomId}/${roomNumber}`);
      const fetchedMessages = response.data;

      // Kullanıcı bilgisini al
      const userInfo = await fetchUserInfo();
      const studentName = `${userInfo.firstName} ${userInfo.lastName}`;

      // Mesajları kontrol ederek kullanıcının mesajlarına işaretleme yap
      const updatedMessages = fetchedMessages.map((message) => ({
        ...message,
        ownMessage: message.studentName === studentName,
      }));

      // Güncellenmiş mesajları set et
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchRoomInfo = async () => {
    try {
      // Sunucudan oda bilgilerini al
      const userInfo = await fetchUserInfo();
      setRoomInfo({
        dormName: userInfo.dormName,
        roomNumber: userInfo.roomNumber,
      });
      fetchMessages(userInfo.roomId, userInfo.roomNumber); // roomId ve roomNumber ile mesajları al
    } catch (error) {
      console.error("Error fetching room info:", error);
    }
  };

  const filterOldMessages = (messages) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return messages.filter((message) => {
      const messageDate = new Date(message.timestamp);
      return messageDate >= thirtyDaysAgo;
    });
  };

  return (
    <div className="chat-wrapper container">
      <div className="chat-sidebar sidebar">
        <List />
      </div>
      <div className="chat-content">
        <div className="chat-top">
          <div className="chat-user">
            <img src="./avatar.png" alt="" />
            <div className="chat-texts">
              <span>{roomInfo.dormName} Yurdu</span>
              <span>Room: {roomInfo.roomNumber}</span>
            </div>
          </div>
        </div>
        <div className="chat-center">
          {messages.map((message, index) => (
            <div
              className={`chat-message ${message.ownMessage ? "own" : "left"}`}
              key={index}
            >
              <div className="chat-text-name">{message.studentName}</div>
              <div className="chat-texts">
                <p>{message.text}</p>
                <span>
                  <time dateTime={message.timestamp}>
                    {new Date(message.timestamp).toLocaleString("tr-TR", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </span>
              </div>
            </div>
          ))}
          <div ref={endRef}></div>
        </div>
        <div className="chat-bottom">
          <div className="chat-icons"></div>
          <input
            type="text"
            value={text}
            placeholder="Type a message..."
            onChange={(e) => setText(e.target.value)}
            className="chat-input"
          />
          <div className="chat-emoji">
            <img
              src="./emoji.png"
              alt=""
              onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
              <div className="chat-picker">
                <EmojiPicker
                  onEmojiClick={(event, emojiObject) =>
                    handleEmoji(emojiObject)
                  }
                />
              </div>
            )}
          </div>
          <button className="chat-sendButton" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
