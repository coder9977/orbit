import { gql } from "apollo-server-koa";

export const typeDefs = gql`
  type Country {
    _id: ID
    code: String!
    name: String!
    emoji: String!
    capital: String
  }

  type Query {
    countries: [Country!]!
    country(code: String!): Country
  }
  type Mutation {
    updateCountryName(code: String!, name: String!): Country
  }
`;
