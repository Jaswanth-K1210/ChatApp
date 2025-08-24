import React, { useState } from "react";

const CreateRoomPopup = ({ onClose, onCreate }) => {
  const [roomName, setRoomName] = useState("");
  const [duration, setDuration] = useState(2);
  const [maxParticipants, setMaxParticipants] = useState(5);
  const [ipFilterEnabled, setIpFilterEnabled] = useState(false);
  const [allowedIps, setAllowedIps] = useState([""]);

  const handleIpChange = (index, value) => {
    const updatedIps = [...allowedIps];
    updatedIps[index] = value;
    setAllowedIps(updatedIps);
  };

  const handleAddIpField = () => {
    if (allowedIps.length < maxParticipants) {
      setAllowedIps([...allowedIps, ""]);
    }
  };

  const handleCreate = () => {
    const roomData = {
      roomName,
      duration,
      maxParticipants,
      ipFilterEnabled,
      allowedIps: ipFilterEnabled ? allowedIps.filter(ip => ip.trim()) : []
    };
    onCreate(roomData);
  };

  return (
    <div style={popupStyle}>
      <h2>Create Room</h2>
      <input
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Duration (in days)"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Max Participants (max 10)"
        value={maxParticipants}
        min={2}
        max={10}
        onChange={(e) => setMaxParticipants(Number(e.target.value))}
        style={inputStyle}
      />
      <label>
        <input
          type="checkbox"
          checked={ipFilterEnabled}
          onChange={(e) => setIpFilterEnabled(e.target.checked)}
        />
        Enable IP Filtering
      </label>
      {ipFilterEnabled && (
        <div>
          {allowedIps.map((ip, idx) => (
            <input
              key={idx}
              placeholder={`IP Address ${idx + 1}`}
              value={ip}
              onChange={(e) => handleIpChange(idx, e.target.value)}
              style={inputStyle}
            />
          ))}
          {allowedIps.length < maxParticipants && (
            <button onClick={handleAddIpField}>+ Add IP Field</button>
          )}
        </div>
      )}
      <div style={{ marginTop: 10 }}>
        <button onClick={handleCreate}>Create</button>
        <button onClick={onClose} style={{ marginLeft: 10 }}>Cancel</button>
      </div>
    </div>
  );
};

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

export default CreateRoomPopup;
