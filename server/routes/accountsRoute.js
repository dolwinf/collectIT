const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/api/users", auth, async (req, res) => {
  try {
    const foundUsers = await User.find();

    res.status(201).json({ foundUsers });
  } catch (error) {
    console.error(error);
  }
});

router.put("/api/users/role", auth, async (req, res) => {
  const { _id, role } = req.body;
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id },
      { role },
      { new: true }
    );

    res.status(201).json({ foundUser });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
