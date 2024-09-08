const Task = require("../dataModels/taskModel");
const Product = require("../dataModels/productModel");
const Team = require("../dataModels/teamModel");
const User = require("../dataModels/userModel");
const StatusOption = require("../dataModels/taskConfigurationOptionModels/statusOption");
const TypeOption = require("../dataModels/taskConfigurationOptionModels/typeOption");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      productId,
      teamId,
      assignedById,
      assignedToIds,
      watcherIds,
      statusId,
      typeId,
      dueOn,
    } = req.body;

    const currentUser = req.user.userId;

    // Validate required fields
    if (!title || !productId || !teamId || !assignedById || !statusId) {
      return res.status(400).json({
        error: "Missing required fields",
        message:
          "Title, productId, teamId, assignedById, and statusId are required",
      });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: "Product not found",
      });
    }

    // Check if the team exists
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({
        message: "Team not found",
        error: "Team not found",
      });
    }

    // Check if the assigning user exists
    const assignedBy = await User.findById(assignedById || currentUser);
    if (!assignedBy) {
      return res.status(404).json({
        message: "Assigned by user not found",
        error: "Assigned by user not found",
      });
    }

    // Validate assigned users if provided
    const assignedTo = assignedToIds
      ? await User.find({ _id: { $in: assignedToIds } })
      : [];

    if (!watcherIds.includes(assignedById || currentUser)) {
      watcherIds.push(assignedById || currentUser);
    }

    // Validate watcher users if provided
    const watcher = watcherIds
      ? await User.find({ _id: { $in: watcherIds } })
      : [assignedBy._id];

    // Validate status option
    const status = await StatusOption.findById(statusId);
    if (!status) {
      return res.status(404).json({
        message: "Status option not found",
        error: "Status option not found",
      });
    }

    // Validate type option if provided
    const type = typeId ? await TypeOption.findById(typeId) : null;

    // Create a new task
    const task = new Task({
      title,
      description,
      priority,
      product: productId,
      team: teamId,
      assignedBy: assignedById,
      assignedTo: assignedTo.map((user) => user._id),
      watcher: watcher.map((user) => user._id),
      status: statusId,
      type: type ? type._id : null,
      dueOn: dueOn || null,
    });

    // Save the task to the database
    await task.save();

    return res.status(201).json({
      message: "success",
      task,
    });
  } catch (error) {
    console.log("Error creating task:", error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { taskId, statusId } = req.params;

    // Validate required fields
    if (!taskId || !statusId) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "taskId and statusId are required",
      });
    }

    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        error: "Task not found",
      });
    }

    // Validate status option
    const status = await StatusOption.findById(statusId);
    if (!status) {
      return res.status(404).json({
        message: "Status option not found",
        error: "Status option not found",
      });
    }

    // Update the task status
    task.status = status._id;
    await task.save();

    return res.status(200).json({
      message: "success",
      status,
    });
  } catch (error) {
    console.log("Error updating task status:", error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId).populate("assignedBy");
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        error: "Task not found",
      });
    }
    return res.status(200).json({ task, message: "success" });
  } catch (error) {
    console.log("Error fetching task:", error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const {
      title,
      description,
      priority,
      typeId,
      assignedToIds,
      watcherIds,
      statusId,
      dueDate,
    } = req.body;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        error: "Task not found",
      });
    }
    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (priority) {
      task.priority = priority;
    }
    if (assignedToIds) {
      task.assignedTo = assignedToIds;
    }
    if (watcherIds) {
      task.watcher = watcherIds;
    }
    if (statusId) {
      task.status = statusId;
    }
    if (dueDate) {
      task.dueOn = dueDate;
    }
    if (typeId) {
      task.type = typeId;
    }
    await task.save();
    return res.status(200).json({ task, message: "success" });
  } catch (error) {
    console.log("Error updating task:", error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

module.exports = {
  createTask,
  updateStatus,
  getTask,
  updateTask,
};
