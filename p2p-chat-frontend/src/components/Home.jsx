import React, { useState, useEffect } from "react";
import CreateRoomPopup from "./CreateRoomPopup";
import JoinRoomPopup from "./JoinRoomPopup";

import axios from "axios";

const Home = ({ user }) => {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [myRooms, setMyRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:5050/api/rooms/my-rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  const handleRoomCreated = () => {
    setShowCreatePopup(false);
    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h2>Welcome, {user.displayName}</h2>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setShowCreatePopup(true)}>➕ Create Room</button>
        <button onClick={() => setShowJoinPopup(true)} style={{ marginLeft: 10 }}>
          🔑 Join Room
        </button>
      </div>

      <h3>My Rooms</h3>
      {myRooms.length === 0 ? (
        <p>No rooms found</p>
      ) : (
        <ul>
          {myRooms.map((room) => (
            <li key={room._id} style={{ marginBottom: 10 }}>
              <strong>{room.name}</strong> - {room.code}
            </li>
          ))}
        </ul>
      )}

      {showCreatePopup && (
        <CreateRoomPopup onClose={() => setShowCreatePopup(false)} onCreate={handleRoomCreated} />
      )}
      {showJoinPopup && (
        <JoinRoomPopup onClose={() => setShowJoinPopup(false)} onJoin={(data) => {
          console.log("Joining room:", data);
          setShowJoinPopup(false);
        }} />
      )}
    </div>
  );
};

export default Home;
