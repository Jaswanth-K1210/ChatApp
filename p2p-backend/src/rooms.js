const rooms = new Map(); // roomId => Set of socket IDs

export const joinRoom = (roomId, socketId) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId).add(socketId);
};

export const leaveRoom = (roomId, socketId) => {
  if (rooms.has(roomId)) {
    rooms.get(roomId).delete(socketId);
    if (rooms.get(roomId).size === 0) {
      rooms.delete(roomId);
    }
  }
};

export const getUsersInRoom = (roomId) => {
  return rooms.has(roomId) ? Array.from(rooms.get(roomId)) : [];
};

export const isRoomFull = (roomId, maxUsers = 2) => {
  return rooms.has(roomId) && rooms.get(roomId).size >= maxUsers;
};
