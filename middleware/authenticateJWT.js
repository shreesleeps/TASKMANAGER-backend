const jwt = require("jsonwebtoken");
const User = require("../dataModels/userModel");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const checkUser = await User.findById(user.userId);
      if (!checkUser) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Attach userId and email to the request object
      req.user = {
        userId: user.userId,
        email: user.email,
        role: user.role,
      };

      next();
    });
  } else {
    return res.status(400).json({ error: "Unauthorized" });
  }
};

module.exports = authenticateJWT;
