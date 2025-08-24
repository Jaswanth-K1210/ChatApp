import { Server } from "socket.io";
import {
  joinRoom,
  leaveRoom,
  getUsersInRoom,
  isRoomFull,
} from "./rooms.js";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", // adjust in prod
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`🔌 New client connected: ${socket.id}`);

    socket.on("join-room", (roomId) => {
      console.log(`📥 ${socket.id} joining room: ${roomId}`);

      if (isRoomFull(roomId)) {
        socket.emit("room-full");
        return;
      }

      joinRoom(roomId, socket.id);
      socket.join(roomId);

      const otherUsers = getUsersInRoom(roomId).filter(id => id !== socket.id);
      socket.emit("users-in-room", otherUsers);

      socket.to(roomId).emit("user-joined", socket.id);

      // Signaling: offer
      socket.on("offer", ({ targetId, offer }) => {
        io.to(targetId).emit("offer", { senderId: socket.id, offer });
      });

      // Signaling: answer
      socket.on("answer", ({ targetId, answer }) => {
        io.to(targetId).emit("answer", { senderId: socket.id, answer });
      });

      // Signaling: ICE candidate
      socket.on("ice-candidate", ({ targetId, candidate }) => {
        io.to(targetId).emit("ice-candidate", { senderId: socket.id, candidate });
      });

      // Leave room
      socket.on("leave-room", () => {
        leaveRoom(roomId, socket.id);
        socket.to(roomId).emit("user-left", socket.id);
        socket.leave(roomId);
      });

      socket.on("send-message", ({ room, content }) => {
  socket.to(room).emit("receive-message", content); // ✅ sends to all *others* in room
});
socket.on("send-message", ({ room, content, sender }) => {
  socket.to(room).emit("receive-message", { sender, content });
});


      // On disconnect
      socket.on("disconnect", () => {
        leaveRoom(roomId, socket.id);
        socket.to(roomId).emit("user-left", socket.id);
        console.log(`❌ Client disconnected: ${socket.id}`);
      });
    });
  });

  console.log("✅ Socket.IO initialized");
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
