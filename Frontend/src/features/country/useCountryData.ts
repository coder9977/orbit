import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import type { Country } from "./countryTypes";

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT || "http://localhost:3138/graphql";

const query = gql`
  query CountryList {
    countries {
      code
      name
      emoji
      capital
    }
  }
`;

interface CountryListResponse {
  countries: Country[];
}

export function useCountryData() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = new GraphQLClient(endpoint);

    client
      .request<CountryListResponse>(query)
      .then((data) => {
        setCountries(data.countries);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
  }, []);

  return { countries, loading, error };
}
