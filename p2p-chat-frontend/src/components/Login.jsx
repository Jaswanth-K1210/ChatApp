// src/components/Login.jsx
import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";

const Login = ({ onLogin }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      // Save to localStorage for reuse
      localStorage.setItem("authToken", token);

      // Pass to parent or redirect
      onLogin(user);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
