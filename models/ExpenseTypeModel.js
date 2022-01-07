const mongoose = require("mongoose");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const ExpenseTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

ExpenseTypeSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("ExpenseType", ExpenseTypeSchema);
