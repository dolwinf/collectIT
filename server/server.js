const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("../server/config/db");
const cookieParser = require("cookie-parser");

const homeRoute = require("./routes/homeRoute");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const assetRoute = require("./routes/assetRoute");
const accountsRoute = require("./routes/accountsRoute");

connectDB();

app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());

app.use(homeRoute, signupRoute, loginRoute, assetRoute, accountsRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
