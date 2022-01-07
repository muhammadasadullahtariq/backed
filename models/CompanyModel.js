const mongoose = require("mongoose");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

CompanySchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("Company", CompanySchema);
