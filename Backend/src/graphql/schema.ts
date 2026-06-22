import { gql } from "apollo-server-koa";

export const typeDefs = gql`
  type Country {
    code: String!
    name: String!
    emoji: String!
    capital: String
  }

  type Query {
    countries: [Country!]!
    country(code: String!): Country
  }
`;
