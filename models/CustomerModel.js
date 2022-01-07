const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const CustomerSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    wallet: {
      type: mongoose.SchemaTypes.Decimal128,
      get: convertDecimal128ToString,
      default: 0,
    },
  },
  { timestamps: true }
);

CustomerSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("Customer", CustomerSchema);
