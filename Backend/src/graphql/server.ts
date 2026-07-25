import { ApolloServer } from "apollo-server-koa";
import { typeDefs } from "./schema/schema.ts";
import resolvers from "./resolvers/resolvers.ts";

export async function createApolloServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });
}
