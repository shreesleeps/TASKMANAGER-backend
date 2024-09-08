// src/routers/teamRoutes.js
const express = require("express");
const {
  createTeam,
  getTeams,
  updateTeam,
  updateTaskOptions,
} = require("../controllers/teamControllers");

const teamRouter = express.Router();

teamRouter.post("/teams", createTeam);
teamRouter.get("/teams", getTeams);
teamRouter.patch("/team/:id", updateTeam);
teamRouter.patch("/team/:id/taskOptions", updateTaskOptions);

module.exports = teamRouter;
