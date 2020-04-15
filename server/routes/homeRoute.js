const router = require("express").Router();

router.get("/api/home", (req, res) => {
  res.send("CollectIT");
});

module.exports = router;
