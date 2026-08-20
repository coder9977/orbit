import { useState, useCallback } from "react";
import type { Country } from "../countryTypes";
import { useCountryData } from "../useCountryData";

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  const [model, setModel] = useState<Country>(country);
  const { updateCountryName } = useCountryData();
  const [countryName, setCountryName] = useState(country.name);
  return (
    <article className="country-card">
      <code>{model._id}</code>
      <h2>{model.name}</h2>
      <p>{model.emoji}</p>
      <dl>
        <div>
          <dt>Code</dt>
          <dd>{model.code}</dd>
        </div>
        <div>
          <dt>Capital</dt>
          <dd>{model.capital || "N/A"}</dd>
        </div>
        <div>
          <input placeholder="input a new country name" value={countryName} onChange={(e) => setCountryName( e.target.value )} />
          <button onClick={async () => {
              const res = await updateCountryName({ code: country.code, name: countryName });
              console.log("res", res);
              setModel({ ...model, name: res.updateCountryName.name });
            }}>Submit</button>
        </div>
      </dl>
    </article>
  );
}
