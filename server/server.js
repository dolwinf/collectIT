const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("../server/config/db");

const homeRoute = require("./routes/homeRoute");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");

connectDB();

app.use(cors());

app.use(express.json());

app.use(homeRoute, signupRoute, loginRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
