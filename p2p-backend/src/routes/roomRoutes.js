import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createRoom, joinRoom, getMyRooms } from "../controllers/roomController.js";

const router = express.Router();

// 🔐 Protect room creation with Firebase token
router.post("/create", verifyToken, createRoom);

// Other routes can also be protected if needed
router.post("/join", joinRoom);
router.get("/my-rooms", verifyToken, getMyRooms); // Optional: protect this too

export default router;
