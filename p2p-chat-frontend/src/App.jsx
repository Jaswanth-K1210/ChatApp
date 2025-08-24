// src/App.jsx
import React, { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home"; // ✅ You must create this
// You will use usePeer inside Home.jsx when needed

function App() {
  const [user, setUser] = useState(null);

  // If not logged in, show login page
  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <Login onLogin={setUser} />
      </div>
    );
  }

  // If logged in, show homepage (create/join/saved rooms)
  return (
    <div>
      <Home user={user} />
    </div>
  );
}

export default App;
// src/App.jsx