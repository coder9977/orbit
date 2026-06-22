import { ApolloServer } from "apollo-server-koa";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

export async function createApolloServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });
}
