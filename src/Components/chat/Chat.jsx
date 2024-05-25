import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import List from "./list/List";
import "./chat.css";
import "./list/list.css";
import "./list/chatlist/chatList.css";
import "./list/userinfo/userInfo.css";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
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
              <span>Jane Doe</span>
              <p>Lorem ipsum dolor, sit amet.</p>
            </div>
          </div>
        </div>
        <div className="chat-center">
          <div className="chat-message">
            <img src="./avatar.png" alt="" />
            <div className="chat-texts">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                officia nam dolorum laudantium deserunt cupiditate. Autem modi,
                veritatis pariatur corporis temporibus quam blanditiis
                inventore, aspernatur iure nostrum at! Nostrum, necessitatibus!
              </p>
              <span>1 min ago ...</span>
            </div>
          </div>
          <div className="chat-message own">
            <div className="chat-texts">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                officia nam dolorum laudantium deserunt cupiditate. Autem modi,
                veritatis pariatur corporis temporibus quam blanditiis
                inventore, aspernatur iure nostrum at! Nostrum, necessitatibus!
              </p>
              <span>1 min ago ...</span>
            </div>
          </div>
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
            <div className="chat-picker">
              <EmojiPicker open={open} onEmojiClick={handleEmoji} />
            </div>
          </div>
          <button className="chat-sendButton">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;