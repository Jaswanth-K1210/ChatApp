// src/controllers/roomController.js
import Room from "../models/Room.js"; // make sure this path is correct

export const createRoom = (req, res) => {
  const user = req.user;
  console.log("Creating room for:", user.uid);
  res.json({ message: "Room created", uid: user.uid });
};

export const joinRoom = (req, res) => {
  const { roomCode } = req.body;
  console.log("Joining room:", roomCode);
  res.json({ message: `Joined room ${roomCode}` });
};

// Updated getMyRooms
export const getMyRooms = async (req, res) => {
  try {
    const userId = req.user.uid;

    const rooms = await Room.find({
      creatorUid: userId,
      expiresAt: { $gt: new Date() } // only active rooms
    });

    res.json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ message: "Server error" });
  }
};
