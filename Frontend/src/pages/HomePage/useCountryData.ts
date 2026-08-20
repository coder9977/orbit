import { useState } from "react";
import type { Country } from "./countryTypes";
import { graphQLClient } from "../../utils/graphql.utils";
import { QUERY_COUNTRIES, MUTATION_UPDATE_COUNTRY_NAME } from "../../graphQl/Countries/countries";


interface CountryListResponse {
  countries: Country[];
}

export function useCountryData() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getCountriesList = () => graphQLClient
      .request<CountryListResponse>(QUERY_COUNTRIES)
      .then((data) => {
        setCountries(data.countries);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });

  const updateCountryName = async ({code, name}: {code: string, name: string}) => await graphQLClient.request(MUTATION_UPDATE_COUNTRY_NAME, { code, name });

  return { countries, loading, error, updateCountryName, getCountriesList };
}
