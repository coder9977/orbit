import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  login_id: { type: mongoose.Schema.Types.ObjectId },
  credentials: { type: String, required: true },
  lastLoginAt: { type: Date },
});

export const LoginModel = mongoose.model("Login", LoginSchema);
