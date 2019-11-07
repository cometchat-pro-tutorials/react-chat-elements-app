import React from "react";
import "react-chat-elements/dist/main.css";

import { Input, MessageBox, Button } from "react-chat-elements";

function App() {
  return (
    <div className="App">
      <MessageBox
        position={"left"}
        type={"photo"}
        text={"mihail_gaberov.svg"}
        data={{
          uri:
            "https://mihail-gaberov.eu/static/profile-pic-538ec3f11211b7561f61b99ab54fb65f.jpg",
          status: {
            click: false,
            loading: 0
          }
        }}
      />
       <Input
        placeholder="Type here..."
        multiline={true}
        rightButtons={
          <Button color="white" backgroundColor="black" text="Send" />
        }
        inputStyle={{ border: '2px solid #dedede',
          backgroundColor: '#f1f1f1',
          borderRadius: '5px',
          padding: '10px',
          margin: '10px 0'
        }}
      />
    </div>
  );
}

export default App;
