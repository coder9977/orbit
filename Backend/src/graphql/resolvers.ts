import { CountryModel } from "../models/country";

export const resolvers = {
  Query: {
    countries: async () => {
      return CountryModel.find().lean();
    },
    country: async (_: unknown, { code }: { code: string }) => {
      return CountryModel.findOne({ code }).lean();
    },
  },
};
