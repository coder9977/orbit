import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  lastLoginAt: { type: Date, default: Date.now },
  createdAt: { type: Date },
  permissions: { type: [String], default: [] },
});

export const UserModel = mongoose.model("User", UserSchema);
