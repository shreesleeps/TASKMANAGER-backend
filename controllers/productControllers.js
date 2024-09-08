const Product = require("../dataModels/productModel");
const Team = require("../dataModels/teamModel");
const Task = require("../dataModels/taskModel");
const StatusOption = require("../dataModels/taskConfigurationOptionModels/statusOption");
const TypeOption = require("../dataModels/taskConfigurationOptionModels/typeOption");
const User = require("../dataModels/userModel");

const createProduct = async (req, res) => {
  try {
    const { title, description, teamId } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Title is required",
        message: "Title is required",
      });
    }

    const checkProductExists = await Product.findOne({ title });
    if (checkProductExists) {
      return res.status(400).json({
        message: "Product already exists",
        error: "Product already exists",
      });
    }

    const checkTeam = await Team.findById(teamId);
    if (!checkTeam) {
      return res.status(400).json({
        message: "Team not found",
        error: "Team not found",
      });
    }

    const product = new Product({
      title,
      description,
      team: teamId,
    });

    await product.save();

    checkTeam.products.push(product);
    await checkTeam.save();

    return res.status(201).json({ message: "success", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the product exists
    const product = await Product.findById(id).populate({
      path: "team",
      populate: [
        { path: "typeOptions", select: "_id label editable" },
        { path: "statusOptions", select: "_id label type editable hexColor" },
      ],
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", error: "Product not found" });
    }

    // Find tasks that reference this product
    // populate based on status and type
    const tasks = await Task.find({ product: product._id })
      .populate({
        path: "status",
        select: "_id label type editable hexColor",
      })
      .populate({
        path: "type",
        select: "_id label editable",
      });

    const users = await User.find({}).select(
      "_id firstName lastName email role"
    );

    return res.status(200).json({
      product,
      tasks,
      users,
      message: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

const getTaskOptionsForProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the product exists
    const product = await Product.findById(id).populate({
      path: "team",
      populate: [
        { path: "typeOptions", select: "_id label editable" },
        { path: "statusOptions", select: "_id label type editable hexColor" },
      ],
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", error: "Product not found" });
    }

    const users = await User.find({}).select(
      "_id firstName lastName email role"
    );

    return res.status(200).json({
      product,
      users,
      message: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const product = await Product.findByIdAndUpdate(id, { title, description });
    return res.status(200).json({ message: "success", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

module.exports = {
  createProduct,
  getTaskOptionsForProduct,
  getProduct,
  updateProduct,
};
