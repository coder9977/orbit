import { UserModel } from "../../models/user.ts";

export const userResolvers = {
  Query: {
    user: async ({ id }: { id: string }) => {
      return UserModel.findOne({ _id: id }).lean();
    },
  },
  Mutation: {
    login: async (_: unknown, { id }: { id: string }) => {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        { lastLogin: new Date() },
        { new: true },
      ).lean();
      return updatedUser;
    },
  }
};
