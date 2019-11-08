import React, { useState } from "react";

import { storeToLocalStorage } from "../../utils/localStorageService";
import "./Login.css";

const Login = ({ callback }) => {
    const [username, setUsername] = useState('');
    const [hasError, setHasError] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        if ((username === 'superhero1' || username === 'superhero2' || username === 'superhero3' || username === 'superhero4' || username === 'superhero5')) {
            setHasError(false);

            storeToLocalStorage('username', username);
            callback();
        } else {
            setHasError(true);
        }
    };

    return (
        <>
            <div className="login-screen">
                <form onSubmit={handleClick}>
                    <div className="form-group">
                        <div>
                            {hasError &&
                            <div className="error">User not authenticated. Please use one of the already registered usernames, e.g.
                                "superhero1"</div>}
                            <label htmlFor="username">Enter your name</label>
                        </div>
                        <input
                            name="username"
                            className="login-input"
                            label="Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                    </div>
                    <div>
                        <button className="login-btn" onClick={handleClick}>Enter Chat</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
