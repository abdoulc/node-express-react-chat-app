import React from 'react';
import "./App.css"
import Chat from "./chat/chat";
import Process from "./process/process";
import Home from "./home/home";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io('http://localhost:8000');

function Appmain() {
  let params = useParams();
  return (
    <>
      <div className="right">
        <Chat
          username={params.username}
          roomname={params.roomname}
          socket={socket}
        />
      </div>
      {/* <div className="left">
        <Process />
      </div> */}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact  element={<Home  socket={socket} />} />      
          <Route path="/chat/:roomname/:username" element={<Appmain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;