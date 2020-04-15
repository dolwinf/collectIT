const router = require("express").Router();
const Asset = require("../models/Asset");

router.post("/api/asset/create", async (req, res) => {
  const { name, model, brand, category, assignee, type, assetID } = req.body;
  try {
    const newAsset = await new Asset({
      name,
      model,
      brand,
      category,
      assignee,
      type,
      assetID,
    }).save();
    console.log({ newAsset });
    res.status(201).json({ newAsset });
    console.log({ newAsset });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
