import React from "react";
import './User.css';

function User({ userData }) {
  return (
    <div className="user">
      <div className="nickname">{userData.name}</div>
      <div className="avatar"><img src={userData.avatar} alt="User avatar"/></div>
    </div>
  );
}

export default User;
