import React, { useState } from "react";
import "./Login.css";
import Logo from '../../images/cometchat-logo.svg'; 

const Login = ({ callback }) => {
  const [username, setUsername] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    if ((
      username === "superhero1" ||
      username === "superhero2" ||
      username === "superhero3" ||
      username === "superhero4" ||
      username === "superhero5"
    ) && callback(username)) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={handleClick}>
        <div className="form-group">
          <div>
            {hasError && (
              <div className="error">
                User not authenticated. Please use one of the already registered
                usernames, e.g. "superhero1"
              </div>
            )}
            <div><a href="https://www.cometchat.com/" target="_blank" rel="noreferrer noopener"><img src={Logo} alt="CometChat logo" /></a></div>
            <label htmlFor="username">Welcome to our <a href="https://github.com/Detaysoft/react-chat-elements" target="_blank" rel="noreferrer noopener">react-chat-elements</a> chat demo powered by CometChat. Login with the username superhero1, superhero2 or superhero3 and test the chat out. To create your own user, see <a href="https://github.com/Detaysoft/react-chat-elements" target="_blank" rel="noreferrer noopener">our documentation.</a></label>
          </div>
          <input
            name="username"
            className="login-input"
            label="Name"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            margin="normal"
            variant="outlined"
            required
          />
        </div>
        <div>
          <button className="login-btn" onClick={handleClick}>
            Enter Chat
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
