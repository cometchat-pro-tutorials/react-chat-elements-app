import React, { useRef, useState, useEffect } from "react";
import { Button, Input, MessageList } from "react-chat-elements";
import { sendChatMessage, fetchChatGroupConversations } from "../../chat-api";

import "react-chat-elements/dist/main.css";

function ChatArea({callback}) {
  const inputRef = useRef("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Load the messages history when entering the chat screen 
  useEffect(() => {
    fetchChatGroupConversations().then(pastMessages => setMessages(pastMessages));
    console.log('>>> useffecf', messages);
}, [messages]);

  const clearTextInput = () => {
    setMessage("");
    inputRef.current.clear();
  };

  const processMessage = messageToBeSent => {
    if (messageToBeSent === "") return;

    sendChatMessage(messageToBeSent).then(msg => {
      setMessages([...messages, ...[msg]]);
      clearTextInput();
    });
  };

  const handleSend = () => {
    processMessage(message);
  };

  return (
    <div className="App">
      <Button onClick={callback} title="LOGOUT" text="LOGOUT" />
      <div className="App-container">
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={messages}
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
