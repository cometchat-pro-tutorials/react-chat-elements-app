import React, { useState } from "react";
import { initChat, loginChat, logoutChat } from "./chat-api";
import ChatArea from "./components/ChatArea";
import Login from "./components/Login";
import {
  readRecord,
  storeToLocalStorage,
  clearAll
} from "./utils/localStorageService";

import "react-chat-elements/dist/main.css";
import "./App.css";

function App() {
  const [hasName, setHasName] = useState(readRecord("username") !== null);

  const handleLogin = username => {
    initChat()
      .then(
        loginChat(username)
          .then(data => {
            storeToLocalStorage("username", username);
            setHasName(data.uid === username);
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

  return (
    <>
      {hasName ? (
        <ChatArea callback={handleLogout} />
      ) : (
        <Login callback={handleLogin} />
      )}
    </>
  );
}

export default App;
