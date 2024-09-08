// // src/routers/taskRoutes.js
const express = require("express");
const {
  createTask,
  updateStatus,
  getTask,
  updateTask,
} = require("../controllers/taskControllers");

const taskRouter = express.Router();

taskRouter.post("/task", createTask);
taskRouter.patch("/task/:taskId/status/:statusId", updateStatus);
taskRouter.get("/task/:taskId", getTask);
taskRouter.patch("/task/:taskId", updateTask);

module.exports = taskRouter;
