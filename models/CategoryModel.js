const mongoose = require("mongoose");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

CategorySchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("Category", CategorySchema);
