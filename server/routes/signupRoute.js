const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isEmail = require("validator/lib/isEmail");
const isLength = require("validator/lib/isLength");

router.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // 1) Validate name / email / password
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send("Name must be 3-10 characters long");
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).send("Password must be at least 6 characters");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    }
    // 2) Check to see if the user already exists in the db
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    // 3) --if not, hash their password
    const hash = await bcrypt.hash(password, 10);
    // 4) create user
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();
    console.log({ newUser });

    // 5) create token for the new user
    const token = jwt.sign({ userId: newUser._id }, "secretqazwsx12345", {
      expiresIn: "7d",
    });
    // 7) send back token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up user. Please try again later");
  }
});

module.exports = router;
