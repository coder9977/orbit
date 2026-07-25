import { UserModel } from "../../models/user.ts";

export const userResolvers = {
  Query: {
    user: async () => {
      return UserModel.find().lean();
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
