import React, { useState } from "react";
import { initChat, loginChat } from './chat-api';
import ChatArea from './components/ChatArea';
import Login from './components/Login';
import { readRecord, storeToLocalStorage } from "./utils/localStorageService";

import "react-chat-elements/dist/main.css";
import "./App.css";

function App() {
  const [hasName, setHasName] = useState(readRecord('username') !== null);

    const handleLogin = (username) => {
        initChat().then(loginChat(username).then((data) => {
            storeToLocalStorage('username', username);
            setHasName(data.uid === username);
        }));
    };

    return (
        <>
            {hasName ? <ChatArea /> : <Login callback={handleLogin} />}
        </>
    );
}

export default App;
