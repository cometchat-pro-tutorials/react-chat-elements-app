import React, { useEffect, useRef, useState } from "react";
import { Button, Input, MessageList } from "react-chat-elements";
import { sendChatMessage } from "../../chat-api";
import PubSub from "pubsub-js";
import { TEXT_MSG, MEDIA_MSG } from "../../utils/consts";

import "./ChatArea.css";
import "react-chat-elements/dist/main.css";

function ChatArea({ logoutCallback, addMessageCallback, messages }) {
  const inputRef = useRef("");
  const [message, setMessage] = useState("");
  const [updatedMessages, setUpdatedMessages] = useState([]);
  const [isMediaFormVisible, setIsMediaFormVisible] = useState(false);

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
      clearTextInput();
    });
  };

  const handleSend = () => {
    processMessage(message);
  };

  const toggleMediaFormVisibility = () => {
    setIsMediaFormVisible(!isMediaFormVisible);
  };

  return (
    <div className="App">
      <Button onClick={logoutCallback} title="LOGOUT" text="LOGOUT" />
      <div className="App-container">
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={updatedMessages}
        />
        <Input
          placeholder="Type here..."
          ref={inputRef}
          multiline={false}
          rightButtons={
            <>
              <button className="media-btn" onClick={toggleMediaFormVisibility}>
                <img
                  alt="Send file"
                  src="https://img.icons8.com/metro/26/000000/send-file.png"
                />
              </button>
              <Button
                color="white"
                backgroundColor="black"
                text="Send"
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

      {isMediaFormVisible && (
        <div className="media-container">
          <input
            type="file"
            id="media"
            name="media"
            multiple
            onChange={e =>
              setMessage(document.getElementById("media").files[0])
            }
          />
          <button className="media-btn" onClick={handleSend}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatArea;
