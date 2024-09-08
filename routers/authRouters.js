// src/routers/authRoutes.js
const express = require("express");
const {
  register,
  login,
  validateToken,
} = require("../controllers/authControllers");
const authenticateJWT = require("../middleware/authenticateJWT");

const authRouter = express.Router();

authRouter.post("/signup", register);
authRouter.post("/login", login);
authRouter.get("/validateToken", validateToken);

module.exports = authRouter;
