import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: String,
  code: String,
  creatorUid: String,
  allowedIps: [String],
  maxParticipants: Number,
  password: String,
  ipFilterEnabled: Boolean,
  expiresAt: Date,
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);
// src/controllers/roomController.js