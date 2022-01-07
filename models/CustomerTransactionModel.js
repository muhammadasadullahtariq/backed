const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const CustomerTransactionSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order" },
    amount: {
      type: mongoose.SchemaTypes.Decimal128,
      get: convertDecimal128ToString,
      default: 0,
    },
    bill: {
      type: mongoose.SchemaTypes.Decimal128,
      get: convertDecimal128ToString,
      default: 0,
    },
    wallet: {
      type: mongoose.SchemaTypes.Decimal128,
      get: convertDecimal128ToString,
      default: 0,
    },
    comment: { type: String },
  },
  { timestamps: true }
);

CustomerTransactionSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model(
  "CustomerTransaction",
  CustomerTransactionSchema
);
