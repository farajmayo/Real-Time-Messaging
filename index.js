const http = require("http")
const express = require("express")
const path = require("path")
const { Server } = require("socket.io")


const app = express()
const server = http.createServer(app)
const io =   new Server(server)

let userIdCounter = 0; 

//Socket.io

io.on('connection' , (socket) =>{
    const userId = ++userIdCounter;
    socket.on("User-Message", message =>{
        console.log("A New User Message" , message)
        io.emit('message', `User  ${userId} : ${message}`);
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected with ID: ${userId}`);
        io.emit('message', `User ${userId} : has disconnected`);
    });
})


app.use(express.static(path.resolve("./public")))


app.get("/" , (req, res)  =>  {
    return res.sendFile("/public/index.html")
})

server.listen(9000 , () => console.log("Connecteed at http://localhost:9000"))

