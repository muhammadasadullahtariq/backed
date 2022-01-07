const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const OrderItemSchema = new Schema({
  order: { type: Schema.ObjectId, ref: "Order", required: true },
  product: { type: Schema.ObjectId, ref: "Product", required: true },
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

OrderItemSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("OrderItem", OrderItemSchema);
