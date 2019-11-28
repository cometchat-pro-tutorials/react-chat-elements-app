import React, { useState, useEffect } from "react";
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

  const preparePastMessagesData = pastMessages => {
    if (Array.isArray(pastMessages)) {
      return pastMessages.map(msg => {
        // Replace all properties 'type:image' with 'type: photo' as per react-chat-elements needs
        if (msg.type && msg.type === "image") {
          msg.type = "photo";
        }
  
        if (msg.data && msg.data.type && msg.data.type === "image") {
          msg.data.type = "photo";
        }
  
        return msg;
      });
    }
    if (pastMessages.error && pastMessages.error.code === "USER_NOT_LOGED_IN") {
      setHasName(false);
    }
    console.warn("No past messages fetched.");
    return [];
  };

  const handleLogin = username => {
    initChat()
      .then(
        loginChat(username)
          .then(data => {
            storeToLocalStorage("username", username);
            setHasName(data.uid === username);

            fetchChatGroupConversations().then(pastMessages => {
              setMessages(preparePastMessagesData(pastMessages));
            });
            return true;
          })
          .catch(err => {
            console.log("No connection to the Chat API", err);
            storeToLocalStorage("username", null);
            setHasName(false);
            return false;
          })
      )
      .catch(err => {
        console.error("Initialization needed: ", err);
        return false;
      });
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

  useEffect(() => {
    initChat().then(loginChat(readRecord('username'))
      .then(() => {
        fetchChatGroupConversations()
        .then(conversationsData => {
            setMessages(preparePastMessagesData(conversationsData));
        })
        .catch(e => {
          console.warn("Fetching chat conversation failed.", e);
          

        })
    }))
}, []);

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
