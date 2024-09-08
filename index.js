const express = require("express");
const connectDB = require("./configs/databaseConnect");
const authenticateJWT = require("./middleware/authenticateJWT");
const cors = require("cors");
const authRouter = require("./routers/authRouters");
const teamRouter = require("./routers/teamRouters");
const productRouter = require("./routers/productRouters");
const taskRouter = require("./routers/taskRouters");
const taskOptionsRouter = require("./routers/taskOptionsRouters");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("taskmaster-backend");
  console.log("service triggered");
});

app.use("/api/auth", authRouter);
app.use("/api", authenticateJWT, teamRouter);
app.use("/api", authenticateJWT, productRouter);
app.use("/api", authenticateJWT, taskRouter);
app.use("/api", authenticateJWT, taskOptionsRouter);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
