var express = require("express"),
  router = express.Router(),
  verifyToken = require('../middlewares/authJWT'),
  {
    signup,
    signin
  } = require("../controllers/auth.controller.js");

router.post("/register", signup, function (req, res) {
  // No need to add anything specific here since the logic is in the signup controller
});

router.post("/login", signin, function (req, res) {
  // No need to add anything specific here since the logic is in the signin controller
});

router.get("/hiddencontent", verifyToken, function (req, res) {
  try {
    if (!req.user) {
      return res.status(403).send({ message: "Invalid JWT token" });
    }

    if (req.user.role === "admin") {
      return res.status(200).send({ message: "Congratulations! but there is no hidden content" });
    } else {
      return res.status(403).send({ message: "Unauthorized access" });
    }
  } catch (error) {
    console.error("Error in /hiddencontent:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
