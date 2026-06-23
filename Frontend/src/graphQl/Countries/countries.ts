import { gql } from "graphql-request";

export const QUERY_COUNTRIES = gql`
  query CountryList {
    countries {
      code
      name
      emoji
      capital
    }
  }
`;