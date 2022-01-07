const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const ShopSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.ObjectId, ref: "Customer", required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    address: { type: String, required: true },
    area: { type: Schema.ObjectId, ref: "Area", required: true },
  },
  { timestamps: true }
);

ShopSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("Shop", ShopSchema);
