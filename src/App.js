import React from "react";
import "react-chat-elements/dist/main.css";

import { ChatItem, MessageBox } from "react-chat-elements";

function App() {
  return (
    <div className="App">
      <ChatItem
        avatar={
          "https://mihail-gaberov.eu/static/profile-pic-538ec3f11211b7561f61b99ab54fb65f.jpg"
        }
        alt={"Reactjs"}
        title={"Facebook"}
        subtitle={"What are you doing?"}
        date={new Date()}
        unread={10}
      />
      <MessageBox
        position={"left"}
        type={"photo"}
        text={"mihail_gaberov.svg"}
        data={{
          uri: "https://mihail-gaberov.eu/static/profile-pic-538ec3f11211b7561f61b99ab54fb65f.jpg",
          status: {
            click: false,
            loading: 0
          }
        }}
      />
    </div>
  );
}

export default App;
