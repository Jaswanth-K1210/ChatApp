
// src/routes/secureRoutes.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.name || req.user.email}` });
});

export default router;
