import { CountryModel } from "../../models/country.ts";

export const countryResolvers = {
  Query: {
    countries: async () => {
      return CountryModel.find().lean();
    },
    country: async (_: unknown, { code }: { code: string }) => {
      return CountryModel.findOne({ code }).lean();
    },
  },
  Mutation: {
    updateCountryName: async (_: unknown, { code, name }: { code: string; name: string }) => {
      const updatedCountry = await CountryModel.findOneAndUpdate(
        { code },
        { name, updated: new Date() },
        { new: true },
      ).lean();
      return updatedCountry;
    },
  }
};
