import { gql } from "apollo-server-koa";

export const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    permissions: [String]
    createdAt: String
    lastLogin: String
  }

  type Query {
    user: User!
  }
  type Mutation {
    login(id: String!, name: String!): User
  }
`;
