import { gql } from "graphql-request";

export const QUERY_COUNTRIES = gql`
  query CountryList {
    countries {
      _id
      code
      name
      emoji
      capital
    }
  }
`;

export const MUTATION_UPDATE_COUNTRY_NAME = gql`
  mutation UpdateCountryName($code: String!, $name: String!) {
    updateCountryName(code: $code, name: $name) {
      _id
      code
      name
      emoji
      capital
    }
  }
`;