const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1) check to see if a user exists with the provided email
    const user = await User.findOne({ email }).select("+password");
    // 2) --if not, return error
    if (!user) {
      return res.status(404).send("No user exists with that email");
    }
    // 3) check to see if users' password matches the one in db
    const passwordsMatch = await bcrypt.compare(password, user.password);
    // 4) --if so, generate a token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, "secretqazwsx12345", {
        expiresIn: "7d",
      });
      // 5) send that token to the client
      res.status(200).json(token);
    } else {
      res.status(401).send("Passwords do not match");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user");
  }
});

module.exports = router;
