const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const PurchaseSchema = new Schema(
  {
    area: { type: Schema.ObjectId, ref: "Area", required: true },
    items: [{ type: Schema.ObjectId, ref: "PurchaseItem" }],
    date: { type: Date, default: Date.now },
    completedTime: { type: Date },
    status: {
      type: String,
      default: "Placed",
      enum: ["Placed", "Completed"],
    },
    total: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
      get: convertDecimal128ToString,
    },
  },
  { timestamps: true }
);

PurchaseSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("Purchase", PurchaseSchema);
