import React from "react";
import 'react-chat-elements/dist/main.css';

import { ChatItem } from "react-chat-elements";

function App() {
  return (
    <div className="App">
      <ChatItem
        avatar={"https://mihail-gaberov.eu/static/profile-pic-538ec3f11211b7561f61b99ab54fb65f.jpg"}
        alt={"Reactjs"}
        title={"Facebook"}
        subtitle={"What are you doing?"}
        date={new Date()}
        unread={0}
      />
    </div>
  );
}

export default App;
