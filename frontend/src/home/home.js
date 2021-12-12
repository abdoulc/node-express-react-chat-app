import React, { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Homepage({ socket }) {
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");
  //activates joinRoom function defined on the backend
  const sendData = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinRoom", { username, roomname });
      //if empty error message pops d up and returns to the same page
    } else {
      alert("username and roomname are must !");
      window.location.reload();
    }
  };

  return (
    <div className="homepage">
      
      <div className="div_form">
      <h1>Welcome</h1>
        <input
          placeholder="User name"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        ></input>
        <input
          placeholder="Room name"
          value={roomname}
          onChange={(e) => setroomname(e.target.value)}
        ></input>
     

      <Link to={`/chat/${roomname}/${username}`}>
        <button onClick={sendData}>JOIN</button>
      </Link>
       </div>
    </div>
  );
}

export default Homepage;