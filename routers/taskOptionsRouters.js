const express = require("express");
const {
  getAllStatus,
  createStatus,
} = require("../controllers/statusOptionsControllers");
const {
  createType,
  getAllType,
} = require("../controllers/typeOptionsControllers");

const taskOptionsRouter = express.Router();

taskOptionsRouter.get("/status", getAllStatus);
taskOptionsRouter.post("/status", createStatus);
taskOptionsRouter.get("/type", getAllType);
taskOptionsRouter.post("/type", createType);

module.exports = taskOptionsRouter;
