import { GraphQLClient } from "graphql-request";
import { BACKEND_GRAPHQL_ENDPOINT } from "../config/config";

const getGraphQLClient = (endpoint: string) =>
  new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

export const graphQLClient = getGraphQLClient(BACKEND_GRAPHQL_ENDPOINT);
