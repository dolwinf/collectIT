const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("../server/config/db");
const cookieParser = require("cookie-parser");

const homeRoute = require("./routes/homeRoute");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const assetRoute = require("./routes/assetRoute");

connectDB();

app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());

app.use(homeRoute, signupRoute, loginRoute, assetRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
