import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  emoji: { type: String, required: true },
  capital: { type: String },
});

export const CountryModel = mongoose.model("Country", CountrySchema);
