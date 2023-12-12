import mongoose from "mongoose";

const tokenAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "1d" },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const TokenAdmin = mongoose.model("TokenAdmin", tokenAdminSchema);

export default TokenAdmin;
