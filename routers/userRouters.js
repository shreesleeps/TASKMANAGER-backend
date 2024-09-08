const express = require("express");
const {
  register,
  logIn,
  deleteUser,
} = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/logIn", logIn);
userRouter.delete("/delete/:userId", deleteUser); // FOR DEV USE ONLY // CREATE DISABLE FOR PROD USE

module.exports =  userRouter ;
