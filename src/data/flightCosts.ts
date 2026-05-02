// Static flight-cost lookup per brief §5.6.
//
// Continent-level estimates only — round-trip USD range to MLE during
// shoulder season. Coarse on purpose; the planner uses these to set
// expectations, not to quote.

export type Continent =
  | "europe"
  | "middle-east"
  | "south-asia"
  | "southeast-asia"
  | "east-asia"
  | "oceania"
  | "africa"
  | "north-america"
  | "south-america";

export type ContinentEstimate = {
  label: string;
  flightLow: number;
  flightHigh: number;
  notes?: string;
};

export const continentEstimates: Record<Continent, ContinentEstimate> = {
  europe: {
    label: "Europe",
    flightLow: 600,
    flightHigh: 1100,
    notes: "Often via Doha, Dubai, or Istanbul.",
  },
  "middle-east": {
    label: "Middle East",
    flightLow: 350,
    flightHigh: 700,
    notes: "Direct flights from Dubai, Doha, Abu Dhabi.",
  },
  "south-asia": {
    label: "South Asia",
    flightLow: 250,
    flightHigh: 550,
    notes: "Direct flights from Delhi, Mumbai, Chennai, Colombo, Kathmandu.",
  },
  "southeast-asia": {
    label: "Southeast Asia",
    flightLow: 400,
    flightHigh: 900,
    notes: "Most routes connect via Kuala Lumpur or Singapore.",
  },
  "east-asia": {
    label: "East Asia",
    flightLow: 700,
    flightHigh: 1400,
    notes: "Often via Bangkok, Singapore, or Kuala Lumpur.",
  },
  oceania: {
    label: "Oceania",
    flightLow: 1100,
    flightHigh: 2000,
    notes: "Routes via Singapore or Kuala Lumpur.",
  },
  africa: {
    label: "Africa",
    flightLow: 700,
    flightHigh: 1500,
    notes: "Direct from Nairobi; otherwise via Dubai or Doha.",
  },
  "north-america": {
    label: "North America",
    flightLow: 1200,
    flightHigh: 2200,
    notes: "Long-haul. Most travellers route via Doha, Dubai, or Istanbul.",
  },
  "south-america": {
    label: "South America",
    flightLow: 1700,
    flightHigh: 2800,
    notes: "Longest haul. Connect through Europe or the Middle East.",
  },
};

export type CountryOption = {
  code: string; // ISO-2 lowercase
  name: string;
  continent: Continent;
};

export const countries: CountryOption[] = [
  // Europe
  { code: "uk", name: "United Kingdom", continent: "europe" },
  { code: "de", name: "Germany", continent: "europe" },
  { code: "fr", name: "France", continent: "europe" },
  { code: "it", name: "Italy", continent: "europe" },
  { code: "es", name: "Spain", continent: "europe" },
  { code: "nl", name: "Netherlands", continent: "europe" },
  { code: "ch", name: "Switzerland", continent: "europe" },
  { code: "at", name: "Austria", continent: "europe" },
  { code: "se", name: "Sweden", continent: "europe" },
  { code: "no", name: "Norway", continent: "europe" },
  { code: "dk", name: "Denmark", continent: "europe" },
  { code: "fi", name: "Finland", continent: "europe" },
  { code: "ie", name: "Ireland", continent: "europe" },
  { code: "be", name: "Belgium", continent: "europe" },
  { code: "pt", name: "Portugal", continent: "europe" },
  { code: "pl", name: "Poland", continent: "europe" },
  { code: "cz", name: "Czechia", continent: "europe" },
  { code: "ro", name: "Romania", continent: "europe" },
  { code: "ru", name: "Russia", continent: "europe" },
  // Middle East
  { code: "ae", name: "United Arab Emirates", continent: "middle-east" },
  { code: "sa", name: "Saudi Arabia", continent: "middle-east" },
  { code: "qa", name: "Qatar", continent: "middle-east" },
  { code: "kw", name: "Kuwait", continent: "middle-east" },
  { code: "om", name: "Oman", continent: "middle-east" },
  { code: "il", name: "Israel", continent: "middle-east" },
  { code: "tr", name: "Türkiye", continent: "middle-east" },
  // South Asia
  { code: "in", name: "India", continent: "south-asia" },
  { code: "lk", name: "Sri Lanka", continent: "south-asia" },
  { code: "pk", name: "Pakistan", continent: "south-asia" },
  { code: "bd", name: "Bangladesh", continent: "south-asia" },
  { code: "np", name: "Nepal", continent: "south-asia" },
  // Southeast Asia
  { code: "sg", name: "Singapore", continent: "southeast-asia" },
  { code: "my", name: "Malaysia", continent: "southeast-asia" },
  { code: "th", name: "Thailand", continent: "southeast-asia" },
  { code: "id", name: "Indonesia", continent: "southeast-asia" },
  { code: "ph", name: "Philippines", continent: "southeast-asia" },
  { code: "vn", name: "Vietnam", continent: "southeast-asia" },
  // East Asia
  { code: "cn", name: "China", continent: "east-asia" },
  { code: "hk", name: "Hong Kong", continent: "east-asia" },
  { code: "tw", name: "Taiwan", continent: "east-asia" },
  { code: "jp", name: "Japan", continent: "east-asia" },
  { code: "kr", name: "South Korea", continent: "east-asia" },
  // Oceania
  { code: "au", name: "Australia", continent: "oceania" },
  { code: "nz", name: "New Zealand", continent: "oceania" },
  // Africa
  { code: "za", name: "South Africa", continent: "africa" },
  { code: "ke", name: "Kenya", continent: "africa" },
  { code: "ng", name: "Nigeria", continent: "africa" },
  { code: "eg", name: "Egypt", continent: "africa" },
  { code: "ma", name: "Morocco", continent: "africa" },
  // North America
  { code: "us", name: "United States", continent: "north-america" },
  { code: "ca", name: "Canada", continent: "north-america" },
  { code: "mx", name: "Mexico", continent: "north-america" },
  // South America
  { code: "br", name: "Brazil", continent: "south-america" },
  { code: "ar", name: "Argentina", continent: "south-america" },
  { code: "cl", name: "Chile", continent: "south-america" },
];

export function flightEstimateByCountry(
  countryCode: string
): ContinentEstimate | null {
  const c = countries.find((x) => x.code === countryCode.toLowerCase());
  if (!c) return null;
  return continentEstimates[c.continent];
}
