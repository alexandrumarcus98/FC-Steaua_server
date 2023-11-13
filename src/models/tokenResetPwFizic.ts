import mongoose from "mongoose";

const tokenResetPwFizicSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Membru Fizic",
    unique: true,
  },
  prenume: {
    type: String,
  },
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "10m" },
  },
});

const TokenResetPwFizic = mongoose.model(
  "Token Reset Pw",
  tokenResetPwFizicSchema
);

export default TokenResetPwFizic;
