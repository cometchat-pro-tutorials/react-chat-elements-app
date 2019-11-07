import React, { useState } from "react";
import { Button, Input, MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import "./App.css";


function App() {
  const [message, setMessage] = useState("");

  const processMessage = message => {
    console.log('<<<<>>>>', message)
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
          multiline={true}
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
          onChange={(e) => setMessage(e.target.value)}
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

export default App;
