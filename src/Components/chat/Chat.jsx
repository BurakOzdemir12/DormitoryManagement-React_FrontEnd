import { useEffect, useRef, useState } from "react";
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
    <div className="container">
      <div className="sidebar">
        <List />
      </div>
      <div className="chat">
        <div className="top">
          <div className="user">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <span>Jane Doe</span>
              <p>Lorem ipsum dolor, sit amet.</p>
            </div>
          </div>
          {/* <div className="icons"> </div> */}
        </div>
        <div className="center">
          <div className="message">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                officia nam dolorum laudantium deserunt cupiditate. Autem modi,
                veritatis pariatur corporis temporibus quam blanditiis
                inventore, aspernatur iure nostrum at! Nostrum, necessitatibus!
              </p>
              <span>1 min ago ...</span>
            </div>
          </div>
          <div className="message own">
            <div className="texts">
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
        <div className="bottom">
          <div className="icons">
            {/* Burada bir belge ekleme yeri yapabilirim tek bakılacak */}
          </div>
          <input
            type="text"
            value={text}
            placeholder="Type a message..."
            onChange={(e) => setText(e.target.value)}
          />
          <div className="emoji">
            <img
              src="./emoji.png"
              alt=""
              onClick={() => setOpen((prev) => !prev)}
            />
            <div className="picker">
              <EmojiPicker open={open} onEmojiClick={handleEmoji}  />
            </div>
          </div>
          <button className="sendButton">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
