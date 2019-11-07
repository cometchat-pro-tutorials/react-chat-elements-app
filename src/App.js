import React, { useState } from "react";
import Login from './components/Login';
import ChatArea from './components/ChatArea';
import { readRecord } from "./utils/localStorageService";

import "react-chat-elements/dist/main.css";
import "./App.css";

function App() {
  const [hasName, setHasName] = useState(readRecord('username') !== null);

    const readName = () => {
        setHasName(readRecord('username') !== null);
    };

    return (
        <>
            {hasName ? <ChatArea /> : <Login callback={readName} />}
        </>
    );
}

export default App;
