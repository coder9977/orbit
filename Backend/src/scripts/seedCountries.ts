import mongoose from "mongoose";
import { CountryModel } from "../models/country";

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/koa_backend";

const COUNTRIES = [
  { code: "US", name: "United States", emoji: "🇺🇸", capital: "Washington D.C." },
  { code: "CA", name: "Canada", emoji: "🇨🇦", capital: "Ottawa" },
  { code: "JP", name: "Japan", emoji: "🇯🇵", capital: "Tokyo" },
  { code: "DE", name: "Germany", emoji: "🇩🇪", capital: "Berlin" },
  { code: "FR", name: "France", emoji: "🇫🇷", capital: "Paris" },
];

async function seed() {
  console.log("Connecting to", MONGO);
  await mongoose.connect(MONGO, { dbName: "koa_backend" });

  for (const c of COUNTRIES) {
    await CountryModel.updateOne({ code: c.code }, { $set: c }, { upsert: true });
    console.log("Upserted", c.code);
  }

  const count = await CountryModel.countDocuments();
  console.log(`Country collection size: ${count}`);

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
