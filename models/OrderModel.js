const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const convertDecimal128ToString = require("../helpers/convertDecimal128ToString");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const OrderSchema = new Schema(
  {
    orderNo: { type: String, required: true },
    shop: { type: Schema.ObjectId, ref: "Shop", required: true },
    rider: { type: Schema.ObjectId, ref: "Rider" },
    items: [{ type: Schema.ObjectId, ref: "OrderItem" }],
    date: { type: Date, default: Date.now },
    dispatchTime: { type: Date },
    deliveredTime: { type: Date },
    status: {
      type: String,
      default: "Placed",
      enum: ["Placed", "Dispatched", "AwaitingPayment", "Completed"],
    },
    total: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
      get: convertDecimal128ToString,
    },
  },
  { timestamps: true }
);

OrderSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("Order", OrderSchema);
