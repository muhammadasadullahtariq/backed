const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const PurchaseItemchema = new Schema({
  purchase: { type: Schema.ObjectId, ref: "Purchase", required: true },
  product: { type: Schema.ObjectId, ref: "Product", required: true },
  supplier: { type: Schema.ObjectId, ref: "Supplier", required: true },
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
});

PurchaseItemchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("PurchaseItem", PurchaseItemchema);
