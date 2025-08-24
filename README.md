# ChatApp 🔐💬

A **P2P Group Chat Application** built with **WebRTC, Firebase Auth, Node.js/Express, MongoDB, and React (Vite)**.  
It allows users to create secure rooms, join via codes, and chat with others in real-time.  
Messages are **peer-to-peer** (not stored on the server), while the server only manages authentication and room metadata.

---

## 🚀 Features
- **Google Login (Firebase Auth)**
- **Create & Join Rooms** with:
  - Room Name
  - Duration (auto-expiry & cleanup)
  - Max Participants (up to 10)
  - Optional Password Protection
  - Optional IP-based Access Control
- **P2P Messaging (WebRTC)**
  - No central storage of chat
  - Each user stores chat locally via IndexedDB
- **Frontend** built with React (Vite) + Tailwind
- **Backend** built with Node.js, Express, and MongoDB
- **Automatic Cleanup** of expired rooms (backend + local storage)

---

## 📂 Project Structure
ChatApp/
│
├── p2p-backend/ # Node.js + Express + MongoDB + Firebase Admin
│ ├── src/
│ │ ├── models/ # Mongoose models
│ │ ├── routes/ # Express routes (roomRoutes, secureRoutes)
│ │ ├── utils/ # Cleanup utility
│ │ ├── socket.js # WebSocket / WebRTC signaling
│ │ └── server.js # Main entry point
│ └── package.json
│
├── p2p-chat-frontend/ # React (Vite) + Tailwind + Firebase
│ ├── src/
│ │ ├── components/ # UI components (Login, Home, Popups, etc.)
│ │ ├── firebase.js # Firebase config
│ │ ├── App.jsx # Main App
│ │ └── usePeer.jsx # WebRTC hooks
│ └── package.json
│
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Backend (p2p-backend)

cd p2p-backend
npm install
Create a .env file inside p2p-backend/ with:

env
Copy
Edit
PORT=5000
MONGO_URI=your-mongodb-uri
FIREBASE_PROJECT_ID=your-firebase-project-id
Run backend:

bash
Copy
Edit
npm start
2️⃣ Frontend (p2p-chat-frontend)
bash
Copy
Edit
cd p2p-chat-frontend
npm install
Create a .env file inside p2p-chat-frontend/ with:

env
Copy
Edit
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
Run frontend:


🔒 Security Notes
Firebase Service Account JSON should not be committed.

Add sensitive files to .gitignore:


node_modules/
.env
*.json
dist/
build/
History has been cleaned with git filter-repo to remove secrets.

👨‍💻 Contribution
Fork the repo

Create a new branch (feature/my-feature)

Commit changes (git commit -m "Add my feature")

Push to branch

Open a Pull Request 🎉

📜 License
MIT License © 2025 Jaswanth K

yaml
Copy
Edit
