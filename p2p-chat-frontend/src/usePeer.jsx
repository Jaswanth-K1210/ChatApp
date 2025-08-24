import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // change if backend runs elsewhere

export default function usePeer() {
  const [messages, setMessages] = useState([]);
  const peerRef = useRef(null);
  const myUsername = useRef("");
  const room = useRef("");

  const joinRoom = (roomCode, username) => {
    myUsername.current = username;
    room.current = roomCode;
    socket.emit("join-room", roomCode);

    socket.on("room-joined", (otherUserId) => {
      // If someone is already in the room, initiate the peer connection
      const peer = new Peer({ initiator: true, trickle: false });

      peer.on("signal", (signal) => {
        socket.emit("send-signal", {
          to: otherUserId,
          from: socket.id,
          signal,
        });
      });

      peer.on("data", (data) => {
        const parsed = JSON.parse(data);
        setMessages((prev) => [...prev, parsed]);
      });

      peerRef.current = peer;
    });

    socket.on("receive-signal", ({ from, signal }) => {
      const peer = new Peer({ initiator: false, trickle: false });

      peer.on("signal", (signal) => {
        socket.emit("return-signal", {
          to: from,
          from: socket.id,
          signal,
        });
      });

      peer.on("data", (data) => {
        const parsed = JSON.parse(data);
        setMessages((prev) => [...prev, parsed]);
      });

      peer.signal(signal);
      peerRef.current = peer;
    });

    socket.on("signal-accepted", ({ signal }) => {
      if (peerRef.current) {
        peerRef.current.signal(signal);
      }
    });
  };

  const sendMessage = (text) => {
    const message = {
      sender: myUsername.current,
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    if (peerRef.current && peerRef.current.connected) {
      peerRef.current.send(JSON.stringify(message));
      setMessages((prev) => [...prev, message]); // Also show in own chat
    }
  };

  useEffect(() => {
    return () => {
      socket.disconnect();
      if (peerRef.current) peerRef.current.destroy();
    };
  }, []);

  return {
    joinRoom,
    sendMessage,
    messages,
  };
}
