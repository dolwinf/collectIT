const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send("CollectIT");
});

module.exports = router;
