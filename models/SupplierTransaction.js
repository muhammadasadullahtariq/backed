const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const SupplierTransactionSchema = new Schema(
  {
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    purchase: { type: Schema.Types.ObjectId, ref: "Purchase" },
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

SupplierTransactionSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model(
  "SupplierTransaction",
  SupplierTransactionSchema
);
