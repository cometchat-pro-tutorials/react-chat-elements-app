import React, { useRef, useState, useEffect } from "react";
import { Button, Input, MessageList } from "react-chat-elements";
import { sendChatMessage, fetchChatGroupConversations } from "../../chat-api";

import "react-chat-elements/dist/main.css";

function ChatArea({callback}) {
  const inputRef = useRef("");
  const [message, setMessage] = useState("");
  const [groupConversations, setGroupConversations] = useState([]);

  useEffect(() => {
    console.log('>>> useEffect');
    fetchChatGroupConversations().then(conversationsData => setGroupConversations(conversationsData));
}, []);

  const clearTextInput = () => {
    setMessage("");
    inputRef.current.clear();
  };

  const processMessage = message => {
    if (message === "") return;

    sendChatMessage(message).then(msg => {
      clearTextInput();
    });
  };

  const handleSend = () => {
    processMessage(message);
  };

  return (
    <div className="App">
      <div className="App-container">
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={groupConversations}
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
        <Button onClick={callback} title="LOGOUT" text="LOGOUT" />
      </div>
    </div>
  );
}

export default ChatArea;
