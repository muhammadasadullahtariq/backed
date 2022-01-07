const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const AreaSchema = new Schema(
  {
    name: { type: String, required: true },
    manager: { type: Schema.ObjectId, ref: "User", required: true },
    bounds: [
      {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

AreaSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("Area", AreaSchema);
