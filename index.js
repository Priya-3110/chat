// let express = require("express");
// let {createServer} = require("http");
// let {Server} = require("socket.io");

// let app = express();
// let server = createServer(app);
// let io = new Server(server, {cors: {origin: "*"}});
// io.on("connection",(socket)=>
// {
//     console.log("New user connected");

//     socket.on("message", (data)=>
//         {
//             let obj = {...data, time: Date.now()};
//             io.emit("message", obj);
//         })
//     socket.on("disconnect", () => 
//         {
//             console.log("User disconnected");
//         });
// });

// server.listen(3000, () => console.log("Node is alive"));
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

// Enable general CORS for Express routes (if any)
app.use(cors());

const server = createServer(app);

// Allow only Firebase frontend to connect
const io = new Server(server, {
  cors: {
    origin: "https://chat-3110.web.app", // ✅ Firebase hosting URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ New user connected");

  socket.on("message", (data) => {
    const obj = { ...data, time: Date.now() };
    io.emit("message", obj);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

// ✅ Use Render's assigned port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
