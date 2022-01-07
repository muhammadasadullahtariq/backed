const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const StockHistorySchema = new Schema(
  {
    supplier: { type: Schema.ObjectId, ref: "Supplier", required: true },
    product: { type: Schema.ObjectId, ref: "Product", required: true },
    date: { type: Date, default: Date.now },
    quantity: { type: Number, required: true },
    price: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
      get: convertDecimal128ToString,
    },
    total: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
      get: convertDecimal128ToString,
    },
  },
  { timestamps: true }
);

StockHistorySchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("StockHistory", StockHistorySchema);
