const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const RiderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    area: { type: Schema.Types.ObjectId, ref: "Area", required: true },
    iban: { type: String },
  },
  { timestamps: true }
);

RiderSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("Rider", RiderSchema);
