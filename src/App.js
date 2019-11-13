import React, { useState } from "react";
import {
  fetchChatGroupConversations,
  initChat,
  loginChat,
  logoutChat
} from "./chat-api";
import ChatArea from "./components/ChatArea";
import Login from "./components/Login";
import {
  clearAll,
  readRecord,
  storeToLocalStorage
} from "./utils/localStorageService";

import "react-chat-elements/dist/main.css";
import "./App.css";

function App() {
  const [hasName, setHasName] = useState(readRecord("username") !== null);
  const [messages, setMessages] = useState([]);

  const handleLogin = username => {
    initChat()
      .then(
        loginChat(username)
          .then(data => {
            storeToLocalStorage("username", username);
            setHasName(data.uid === username);
            fetchChatGroupConversations().then(pastMessages => {
              pastMessages = pastMessages.map(msg => {
                // Replace all properties 'type:image' with 'type: photo' as per react-chat-elements needs
                if (msg.type && msg.type === "image") {
                  msg.type = "photo";
                }

                if (msg.data && msg.data.type && msg.data.type === "image") {
                  msg.data.type = "photo";
                }

                return msg;
              });
              setMessages(pastMessages);
            });
          })
          .catch(err => console.error("No connection to the Chat API", err))
      )
      .catch(err => console.error("Initialization needed: ", err));
  };

  const handleLogout = () => {
    logoutChat();
    clearAll();
    setHasName(false);
  };

  const handleAddMessage = (groupConversations, msg) => {
    // Replace the property 'type:image' with 'type: photo' of the current message as per react-chat-elements needs
    if (msg.type && msg.type === "image") {
      msg.type = "photo";
    }

    if (msg.data && msg.data.type && msg.data.type === "image") {
      msg.data.type = "photo";
    }

    setMessages([...groupConversations, ...[msg]]);
  };

  return (
    <>
      {hasName ? (
        <ChatArea
          logoutCallback={handleLogout}
          addMessageCallback={handleAddMessage}
          messages={messages}
        />
      ) : (
        <Login callback={handleLogin} />
      )}
    </>
  );
}

export default App;
