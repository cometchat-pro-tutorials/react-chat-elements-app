import React, { useEffect, useRef, useState } from "react";
import { Button, Input, MessageList } from "react-chat-elements";
import { sendChatMessage } from "../../chat-api";
import PubSub from "pubsub-js";

import "react-chat-elements/dist/main.css";

function ChatArea({ logoutCallback, addMessageCallback, messages }) {
  const inputRef = useRef("");
  const [message, setMessage] = useState("");
  const [updatedMessages, setUpdatedMessages] = useState([]);

  const mySubscriber = (msg, data) => {
    if (msg === "CHAT_MSG") {
      addMessageCallback(updatedMessages, data);
    }
  };

  PubSub.subscribe("CHAT_MSG", mySubscriber);

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
            <Button
              color="white"
              backgroundColor="black"
              text="Send"
              onClick={handleSend}
            />
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
  );
}

export default ChatArea;
