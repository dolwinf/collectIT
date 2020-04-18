const mongoose = require("mongoose");

const { String, Number } = mongoose.Schema.Types;

const AssetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    assetID: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
    },

    category: {
      type: String,
    },
    type: {
      type: String,
    },
    assignee: {
      type: String,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Asset || mongoose.model("Asset", AssetSchema);
