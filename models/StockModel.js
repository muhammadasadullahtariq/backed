const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const StockSchema = new Schema(
  {
    supplier: { type: Schema.ObjectId, ref: "Supplier", required: true },
    product: { type: Schema.ObjectId, ref: "Product", required: true },
    area: { type: Schema.ObjectId, ref: "Area", required: true },
    price: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
      get: convertDecimal128ToString,
    },
    inStock: { type: Number, required: true, default: 0 },
    sold: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

StockSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("Stock", StockSchema);
