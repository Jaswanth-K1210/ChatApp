import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import roomRoutes from "./src/routes/roomRoutes.js";
import { cleanExpiredRooms } from "./src/utils/cleanup.js";
import { Server } from "socket.io";
import http from "http";

// ✅ Firebase Admin SDK
import admin from "./src/firebase.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/rooms", roomRoutes);

// Socket setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // ❗ For dev only — lock this to your frontend domain in production
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomCode) => {
    socket.join(roomCode);
    const clients = Array.from(io.sockets.adapter.rooms.get(roomCode) || []);
    const otherUserId = clients.find(id => id !== socket.id);
    if (otherUserId) {
      socket.emit("room-joined", otherUserId);
    }
  });

  socket.on("send-signal", ({ to, from, signal }) => {
    io.to(to).emit("receive-signal", { from, signal });
  });

  socket.on("return-signal", ({ to, from, signal }) => {
    io.to(to).emit("signal-accepted", { from, signal });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5050;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      cleanExpiredRooms();
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
