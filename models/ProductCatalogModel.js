const mongoose = require("mongoose");
require("dotenv").config();

const Schema = mongoose.Schema;

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const ProductCatalogSchema = new Schema(
  {
    name: { type: String, required: true },
    images: {
      type: [String],
      get: function convertDecimal128ToString(value) {
        if (typeof value !== "undefined") {
          var images = [];
          value.forEach((val) => {
            images.push({
              name: val,
              url: process.env.PRODUCT_IMAGE_ENDPOINT + val,
            });
          });
          return images;
        }
        return value;
      },
    },
    company: { type: Schema.ObjectId, ref: "Company", required: true },
    category: { type: Schema.ObjectId, ref: "Category", required: true },
    description: String,
    priceLimit: {
      min: {
        type: mongoose.SchemaTypes.Decimal128,
        required: true,
        get: convertDecimal128ToString,
      },
      max: {
        type: mongoose.SchemaTypes.Decimal128,
        required: true,
        get: convertDecimal128ToString,
      },
    },
    isFeatured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProductCatalogSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("ProductCatalog", ProductCatalogSchema);
