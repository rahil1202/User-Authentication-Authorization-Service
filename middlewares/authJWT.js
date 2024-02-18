const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.API_SECRET);

      const user = await User.findOne({ _id: decoded.id });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } else {
      req.user = undefined;
      next();
    }
  } catch (error) {
    // Handle JWT verification errors or other exceptions
    console.error("Error in verifyToken middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyToken;
