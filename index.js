let express = require("express");
let {createServer} = require("http");
let {Server} = require("socket.io");

let app = express();
let server = createServer(app);
let io = new Server(server, {cors: {origin: "*"}});
io.on("connection",(socket)=>
{
    console.log("New user connected");

    socket.on("message", (data)=>
        {
            let obj = {...data, time: Date.now()};
            io.emit("message", obj);
        })
    socket.on("disconnect", () => 
        {
            console.log("User disconnected");
        });
});

server.listen(3000, () => console.log("Node is alive"));