import { GraphQLClient } from "graphql-request";

export const getGraphQLClient = (endpoint: string) => {
  const client = new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return client;
}