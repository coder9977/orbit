import type { Country } from "./countryTypes";

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <article className="country-card">
      <h2>{country.name}</h2>
      <p>{country.emoji}</p>
      <dl>
        <div>
          <dt>Code</dt>
          <dd>{country.code}</dd>
        </div>
        <div>
          <dt>Capital</dt>
          <dd>{country.capital || "N/A"}</dd>
        </div>
      </dl>
    </article>
  );
}
