const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const homeRoute = require("./routes/homeRoute");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/", homeRoute);

const PORT = process.env.PORT || 4000;

mongoose.connect(
  "mongodb+srv://dolwin:mongo333@collecit-rjoxg.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },

  () => console.log("DB connected")
);

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
