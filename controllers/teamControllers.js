const Team = require("../dataModels/teamModel");
const Product = require("../dataModels/productModel");
const StatusOption = require("../dataModels/taskConfigurationOptionModels/statusOption");
const TypeOption = require("../dataModels/taskConfigurationOptionModels/typeOption");

const createTeam = async (req, res) => {
  try {
    const { title, description, status, type } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Title is required",
        message: "Title is required",
      });
    }

    const checkTeamExists = await Team.findOne({ title });
    if (checkTeamExists) {
      return res
        .status(400)
        .json({ message: "Team already exists", error: "Team already exists" });
    }

    const team = new Team({
      title,
      description,
      products: [],
      statusOptions: status,
      typeOptions: type,
    });

    await team.save();

    return res.status(201).json({ message: "success", team });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

const getTeams = async (req, res) => {
  try {
    // Find all teams and populate the products array
    const teams = await Team.find({})
      .populate({
        path: "statusOptions",
        select: "_id label type editable hexColor",
      })
      .populate({
        path: "typeOptions",
        select: "_id label editable",
      })
      .populate({
        path: "products", // populate the products array
        select: "_id title description", // only return _id and title fields from the products
      })
      .select("_id title products description"); // only return _id, title, and products fields from the teams

    res.status(200).json({ teams, message: "success" });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({
        message: "Team not found",
        error: "Team not found",
      });
    }

    if (title) {
      team.title = title;
    }
    if (description) {
      team.description = description;
    }

    await team.save();
    return res.status(200).json({ message: "success", team });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

const updateTaskOptions = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusOptions, typeOptions } = req.body;

    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({
        message: "Team not found",
        error: "Team not found",
      });
    }

    console.log(statusOptions, typeOptions);

    const status = statusOptions
      ? await StatusOption.find({ _id: { $in: statusOptions } })
      : await StatusOption.find({ editable: false });

    const type = typeOptions
      ? await TypeOption.find({ _id: { $in: typeOptions } })
      : await TypeOption.find({ editable: false });

    console.log(status, type);

    team.statusOptions = status;
    team.typeOptions = type;
    await team.save();
    return res.status(200).json({ message: "success", team });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

module.exports = {
  createTeam,
  getTeams,
  updateTeam,
  updateTaskOptions,
};
