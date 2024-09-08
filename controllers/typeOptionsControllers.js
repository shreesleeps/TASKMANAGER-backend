const Type = require("../dataModels/taskConfigurationOptionModels/typeOption");

const getAllType = async (req, res) => {
  console.log("getAllType");
  try {
    const type = await Type.find({});
    return res.status(200).json({ type, message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

const createType = async (req, res) => {
  try {
    const { label } = req.body;
    if (!label) {
      return res.status(400).json({
        error: "Label is required",
        message: "Label is required",
      });
    }

    const checkTypeExists = await Type.findOne({ label });
    if (checkTypeExists) {
      return res
        .status(400)
        .json({ message: "Type already exists", error: "Type already exists" });
    }

    const type = new Type({ label });
    await type.save();
    return res.status(201).json({ type, message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

module.exports = { getAllType, createType };
