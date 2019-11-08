import React, { useRef, useState } from "react";
import { Button, Input, MessageList } from "react-chat-elements";
import { sendChatMessage } from "../../chat-api";

import "react-chat-elements/dist/main.css";

function ChatArea({callback}) {
  const inputRef = useRef("");
  const [message, setMessage] = useState("");

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
        <button onClick={callback}>LOGOUT</button>
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={[
            {
              position: "right",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date()
            },
            {
              position: "left",
              type: "photo",
              text: "mihail.svg",
              date: new Date(),
              data: {
                uri:
                  "https://mihail-gaberov.eu/static/profile-pic-538ec3f11211b7561f61b99ab54fb65f.jpg",
                status: {
                  click: false,
                  loading: 0
                }
              }
            }
          ]}
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
