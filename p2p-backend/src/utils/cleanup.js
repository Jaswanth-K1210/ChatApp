import Room from "../models/Room.js";
import cron from "node-cron";

export const cleanExpiredRooms = () => {
  cron.schedule("0 * * * *", async () => {
    const now = new Date();
    const expiredRooms = await Room.find();

    for (let room of expiredRooms) {
      const age = (now - room.createdAt) / (1000 * 60 * 60); // in hours
      if (age > room.duration) {
        await Room.deleteOne({ _id: room._id });
        console.log(`Deleted expired room: ${room.roomCode}`);
      }
    }
  });
};
