const Status = require("../dataModels/taskConfigurationOptionModels/statusOption");

const getAllStatus = async (req, res) => {
  try {
    const status = await Status.find({});
    return res.status(200).json({ status, message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};

const createStatus = async (req, res) => {
  try {
    const { label, type, hexColor } = req.body;
    if (!label) {
      return res.status(400).json({
        error: "Label is required",
        message: "Label is required",
      });
    }

    const checkStatusExists = await Status.findOne({ label });
    if (checkStatusExists) {
      return res.status(400).json({
        message: "Status already exists",
        error: "Status already exists",
      });
    }

    const status = new Status({ label, type, hexColor });
    await status.save();
    return res.status(201).json({ status, message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
      message: error?.message || "Internal server error",
    });
  }
};



module.exports = { getAllStatus, createStatus };
