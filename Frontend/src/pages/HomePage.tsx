import { CountryList } from "../features/country/CountryList";

export function HomePage() {
  return (
    <main className="page-container">
      <header className="page-header">
        <h1>Atomic GraphQL UI</h1>
        <p>Reusable components selecting exactly the fields they need.</p>
      </header>
      <CountryList />
    </main>
  );
}
