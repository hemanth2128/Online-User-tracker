const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  io.emit("updateUserCount", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("updateUserCount", onlineUsers);
  });
});

server.listen(5000, () => {
  console.log("🔥 Server running on http://localhost:5000");
});
