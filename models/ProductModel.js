const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const ProductSchema = new Schema(
  {
    detail: { type: Schema.ObjectId, ref: "ProductCatlog", required: true },
    area: { type: Schema.ObjectId, ref: "Area", required: true },
    price: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
      get: convertDecimal128ToString,
    },
    inStock: { type: Number, required: true, default: 0 },
    dispatched: { type: Number, required: true, default: 0 },
    sold: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProductSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("Product", ProductSchema);
