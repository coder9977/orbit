import { useCountryData } from "../useCountryData";
import { CountryCard } from "./CountryCard";
import { useEffect } from "react";

export function CountryList() {
  const { countries, loading, error, getCountriesList } = useCountryData();

  useEffect(() => {
    getCountriesList();
  }, [getCountriesList]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="country-list">
      {countries.map((country) => (
        <CountryCard key={country.code} country={country} />
      ))}
    </section>
  );
}
