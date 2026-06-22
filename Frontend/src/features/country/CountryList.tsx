import { useCountryData } from "./useCountryData";
import { CountryCard } from "./CountryCard";

export function CountryList() {
  const { countries, loading, error } = useCountryData();

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
