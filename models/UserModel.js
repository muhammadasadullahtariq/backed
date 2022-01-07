const mongoose = require("mongoose");

const defaultSchemaPlugin = require("../helpers/defaultSchemaPlugin");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobileNo: { type: String, reqired: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    cnic: { type: String, required: true },
    role: [String],
    joiningDate: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

UserSchema.plugin(defaultSchemaPlugin);

module.exports = mongoose.model("User", UserSchema);
