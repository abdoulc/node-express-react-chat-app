const express = require('express');
const socket = require('socket.io');
const color = require('colors');
const cors = require('cors')
const {
    join_user,
    get_current_user,
    user_disconnect
} = require("./usersData");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors())

var server = app.listen(PORT,console.log(`server is running on port : ${PORT} `.green))

const io = socket(server, {
    transports: ['polling'],
    cors: {
        cors:{
            origin: "http://localhost:3000"
        }
    }
});

io.on("connection", (socket) =>{
    console.log('user joined the room')
    socket.on("joinRoom", ({username, roomname})=>{
        //create user
        const user = join_user(socket.id, username, roomname);
        socket.join(user.room);

        //join message room

        socket.emit("message", {
            userId: user.id,
            username: user.unsername,
            text: `Welcome ${user.unsername}`
        })

        //join message to others
        socket.broadcast.to(user.room).emit("message", {
            userId: user.id,
            username: user.unsername,
            text: `${user.unsername} has joined`
        })

        //user sending message
        socket.on("chat", (text)=>{
            console.log('talking')
            const user = get_current_user(socket.id);

            io.to(user.room).emit("message", {
                userId: user.id,
                username: user.unsername,
                text: text
            })
        })

        //when user exits
        socket.on("disconnect", ()=>{
            const user = user_disconnect(socket.id);

            if(user){
                io.to(user.room).emit("message", {
                    userId: user.id,
                    username: user.unsername,
                    text: `${user.unsername} has left the room`
                })
            }
        })
    })
})