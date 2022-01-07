const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const ExpenseSchema = new mongoose.Schema(
  {
    type: { type: Schema.Types.ObjectId, ref: "ExpenseType", required: true },
    area: { type: Schema.Types.ObjectId, ref: "Area", required: true },
    date: { type: Date, default: Date.now },
    amount: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
      get: convertDecimal128ToString,
    },
    comment: { type: String },
  },
  { timestamps: true }
);

ExpenseSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("Expense", ExpenseSchema);
