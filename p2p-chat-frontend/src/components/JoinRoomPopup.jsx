import React, { useState } from "react";

const JoinRoomPopup = ({ onClose, onJoin }) => {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");

  const handleJoin = () => {
    if (!roomCode.trim() || !username.trim()) {
      alert("Both fields are required.");
      return;
    }

    onJoin({ roomCode, username });
  };

  return (
    <div style={popupStyle}>
      <h2>Join Room</h2>

      <input
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={handleJoin}>Join</button>
        <button onClick={onClose} style={{ marginLeft: 10 }}>Cancel</button>
      </div>
    </div>
  );
};

// Shared styles with create popup
const popupStyle = {
  background: "#fff",
  padding: 20,
  border: "1px solid #ccc",
  width: 400,
  margin: "auto",
  marginTop: 100,
  borderRadius: 10
};

const inputStyle = {
  display: "block",
  marginBottom: 10,
  width: "100%",
  padding: 8
};

export default JoinRoomPopup;
// p2p-chat-frontend/src/components/JoinRoomPopup.jsx