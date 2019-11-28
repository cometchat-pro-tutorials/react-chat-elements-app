import React, { useEffect, useRef, useState } from "react";
import PubSub from "pubsub-js";
import { Button, Input, MessageBox } from "react-chat-elements";
import { sendChatMessage } from "../../chat-api";
import { MEDIA_MSG, TEXT_MSG } from "../../utils/consts";

import "react-chat-elements/dist/main.css";
import "./ChatArea.css";
import User from "../User/User";
import { scrollToBottom } from './../../utils/helpers';

function ChatArea({ logoutCallback, addMessageCallback, messages }) {
  const inputRef = useRef("");
  const messagesAreaRef = useRef();
  const [message, setMessage] = useState("");
  const [updatedMessages, setUpdatedMessages] = useState([]);

  const mySubscriber = (msg, data) => {
    if (msg === TEXT_MSG || msg === MEDIA_MSG) {
      addMessageCallback(updatedMessages, data);
    }
  };

  PubSub.subscribe(TEXT_MSG, mySubscriber);
  PubSub.subscribe(MEDIA_MSG, mySubscriber);

  useEffect(() => {
    setUpdatedMessages(messages);
  }, [messages]);

  const clearTextInput = () => {
    setMessage("");
    inputRef.current.clear();
  };

  const processMessage = messageToBeSent => {
    if (messageToBeSent === "") return;

    sendChatMessage(messageToBeSent).then(msg => {
      addMessageCallback(updatedMessages, msg);
      const messagesArea = messagesAreaRef.current;
      const shouldScroll = messagesArea.scrollTop + messagesArea.clientHeight !== messagesArea.scrollHeight;

            if (shouldScroll) {
                scrollToBottom(messagesArea);
            }

      clearTextInput();
    });
  };

  const handleSend = () => {
    processMessage(message);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="logout-btn">
          <Button
            backgroundColor="black"
            onClick={logoutCallback}
            title="LOGOUT"
            text="X"
          />
        </div>
        <div className="messages-list" ref={messagesAreaRef}>
          {updatedMessages.map((msg, idx) => (
            <div className="message" key={idx}>
              <User userData={msg.sender} />
              <MessageBox
                key={idx}
                position={"left"}
                type={msg.type}
                onClick={() => window.open(msg.data.url)}
                text={msg.text}
                data={{
                  uri: msg.data.url,
                  status: {
                    click: false,
                    loading: 0
                  }
                }}
              />
            </div>
          ))}
        </div>
        <div className="send-messages-input">
          <Input
            placeholder="Type here..."
            ref={inputRef}
            multiline={false}
            rightButtons={
              <>
                <div className="upload-btn-wrapper">
                  <input
                    type="file"
                    id="media"
                    onChange={e =>
                      processMessage(document.getElementById("media").files[0])
                    }
                  />
                  <button className="upload-btn">
                    <img
                      alt="Upload file"
                      src="https://img.icons8.com/metro/26/000000/send-file.png"
                    />
                  </button>
                </div>
                <Button
                  color="white"
                  backgroundColor="black"
                  text="SEND"
                  onClick={handleSend}
                />
              </>
            }
            onKeyPress={e => {
              if (e.key === "Enter") {
                processMessage(e.target.value);
              }
            }}
            onChange={e => setMessage(e.target.value)}
            inputStyle={{
              border: "2px solid #dedede",
              backgroundColor: "#f1f1f1",
              borderRadius: "5px",
              padding: "10px",
              margin: "10px 0"
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
