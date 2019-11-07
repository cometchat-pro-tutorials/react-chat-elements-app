import React, { useRef } from "react";
import { Input, MessageList, Button } from "react-chat-elements";

import "./App.css";
import "react-chat-elements/dist/main.css";

function App() {
  const refContainer = useRef("");

  const sendMessage = () => {
    console.log(refContainer.current.state.value);
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
          ref={refContainer}
          rightButtons={
            <Button
              color="white"
              backgroundColor="black"
              text="Send"
              onClick={sendMessage}
            />
          }
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
