import { useEffect, useRef, useState } from "react";
import type { Country } from "./countryTypes";
import { getGraphQLClient } from "../../utils/graphql";
import { BACKEND_GRAPHQL_ENDPOINT } from "../../constants/global_constants";
import {QUERY_COUNTRIES} from "../../graphQl/Countries/countries";


interface CountryListResponse {
  countries: Country[];
}

export function useCountryData() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = getGraphQLClient(BACKEND_GRAPHQL_ENDPOINT);

    client
      .request<CountryListResponse>(QUERY_COUNTRIES)
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
