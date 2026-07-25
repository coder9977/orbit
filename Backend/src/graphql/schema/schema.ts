import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as countryTypeDefs } from "./countrySchema.ts";
import { typeDefs as userTypeDefs } from "./userSchema.ts";


export const typeDefs = mergeTypeDefs([countryTypeDefs, userTypeDefs]);
