const router = require("express").Router();
const Asset = require("../models/Asset");
const auth = require("../middleware/auth");

router.post("/api/asset/create", auth, async (req, res) => {
  const {
    name,
    model,
    brand,
    category,
    assignee,
    type,
    assetID,
    description,
  } = req.body;
  try {
    const newAsset = await new Asset({
      name,
      model,
      brand,
      category,
      assignee,
      type,
      assetID,
      description,
    }).save();
    console.log({ newAsset });
    res.status(201).json({ newAsset });
    console.log({ newAsset });
  } catch (error) {
    console.error(error);
  }
});

router.get("/api/assets/", async (req, res) => {
  try {
    const foundAssets = await Asset.find();

    res.status(201).json({ foundAssets });
  } catch (error) {
    console.error(error);
  }
});

router.post("/api/asset/track/", async (req, res) => {
  const { assetID } = req.body;
  console.log(assetID);
  try {
    const foundAsset = await Asset.find({
      assetID,
    });
    console.log({ foundAsset });
    res.status(201).json({ foundAsset });
  } catch (error) {
    console.error(error);
  }
});

router.get("/api/asset/:id/", async (req, res) => {
  const id = req.params.id;
  try {
    const foundAsset = await Asset.findOne({
      _id: id,
    });
    console.log({ foundAsset });
    res.status(201).json({ foundAsset });
    console.log({ foundAsset });
  } catch (error) {
    console.error(error);
  }
});

router.post("/api/search", auth, async (req, res) => {
  const {
    name,
    model,
    brand,
    category,
    assignee,
    type,
    description,
    assetID,
  } = req.body;
  try {
    const foundAssets = await Asset.find({
      $or: [
        { name },
        { model },
        { brand },
        { category },
        { assignee },
        { type },
        { description },
        { assetID },
      ],
    });
    console.log({ foundAssets });
    res.status(201).json({ foundAssets });
    console.log({ foundAssets });
  } catch (error) {
    console.error(error);
  }
});

router.put("/api/asset/rating", async (req, res) => {
  const { id, rating } = req.body;

  try {
    const updatedAsset = await Asset.findByIdAndUpdate(
      { _id: id },
      {
        rating,
      }
    );
    console.log({ updatedAsset });
    res.status(201).json({ updatedAsset });
    console.log({ updatedAsset });
  } catch (error) {
    console.error(error);
  }
});

router.put("/api/asset/update/:id", async (req, res) => {
  const id = req.params.id;
  const {
    name,
    model,
    brand,
    category,
    assignee,
    type,
    assetID,
    description,
  } = req.body;
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(
      { _id: id },
      {
        name,
        model,
        brand,
        category,
        assignee,
        type,
        assetID,
        description,
      }
    );
    console.log({ updatedAsset });
    res.status(201).json({ updatedAsset });
    console.log({ updatedAsset });
  } catch (error) {
    console.error(error);
  }
});

router.delete("/api/asset/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Asset.findByIdAndDelete({
      _id: id,
    });
    res.status(201).json({ message: "Asset deleted." });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
