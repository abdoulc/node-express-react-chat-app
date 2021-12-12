import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import { toDecrypt, toEncrypt } from "../aes.js";
import { process } from "../store/action/index";
import { useDispatch } from "react-redux";

function Chat({username, roomname, socket}){
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
   

    const dispatch =useDispatch();

    const dispacthProcess = (encrypt, msg, cipher) =>{
        dispatch(process(encrypt, msg, cipher));
        
    }

    useEffect(()=>{
        socket.on("message", (data)=>{
            console.log('data', data)
            const decrypt_message = toDecrypt(data.text, data.username);
            dispacthProcess(false, decrypt_message, data.text)

            let temp = messages;
            temp.push({
                userId: data.userId,
                username: data.username,
                text: decrypt_message
            });
            setMessages([...temp]);
           
        })
    }, [socket]);

    const sendData = () =>{
        if(text !== ""){
            const encrypt_message = toEncrypt(text);
            const newMessage ={
                userId: socket.id,
                username: username,
                text: text
            }
            setMessages([...messages, newMessage]);
            socket.emit("chat",encrypt_message);
            setText("");
        }
    }

    const messagesEndRef = useRef(null);

    const scrollToBottom = () =>{
        messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }

    useEffect(scrollToBottom, [messages]);

    return(
        <div className="chat">
        <div className="user-name">
          <h2>
            {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
          </h2>
        </div>
        <div className="chat-message">
          {messages.map((i) => {
            if (i.username === username) {
              return (
                <div className="message" key={i.username}>
                  <p>{i.text}</p>
                  <span>{i.username}</span>
                </div>
              );
            } else {
              return (
                <div className="message mess-right" key={i.username}>
                  <p>{i.text} </p>
                  <span>{i.username}</span>
                </div>
              );
            }
          })}
          <div ref={messagesEndRef} />

        </div>
        <div className="send">
          <input
            placeholder="enter your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendData();
              }
            }}
          ></input>
          <button onClick={sendData}>Send</button>
        </div>
      </div>
    )
}

export default Chat;