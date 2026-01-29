import Papa from "papaparse";
import type { EVRecord } from "./ev";

const CSV_URL = "/Electric_Vehicle_Population_Data.csv";

function num(value: string): number {
  const n = Number(value?.trim());
  return Number.isFinite(n) ? n : 0;
}

function str(value: string): string {
  return value?.trim() ?? "";
}

function rowToRecord(row: string[]): EVRecord {
  return {
    vin: str(row[0]),
    county: str(row[1]),
    city: str(row[2]),
    state: str(row[3]),
    postalCode: str(row[4]),
    modelYear: num(row[5]),
    make: str(row[6]),
    model: str(row[7]),
    electricVehicleType: str(row[8]),
    cafvEligibility: str(row[9]),
    electricRange: num(row[10]),
    baseMsrp: num(row[11]),
    legislativeDistrict: str(row[12]),
    dolVehicleId: str(row[13]),
    vehicleLocation: str(row[14]),
    electricUtility: str(row[15]),
    censusTract2020: str(row[16]),
  };
}

export async function loadEVData(): Promise<EVRecord[]> {
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.status}`);
  const text = await res.text();

  const parsed = Papa.parse<string[]>(text, {
    skipEmptyLines: true,
    header: false,
  });

  if (parsed.errors.length > 0) {
    console.warn("CSV parse errors:", parsed.errors);
  }

  const rows = parsed.data;
  if (!rows?.length) return [];

  const dataRows = rows.slice(1);
  const records: EVRecord[] = [];

  for (const row of dataRows) {
    if (!row?.length || !str(row[0])) continue;
    records.push(rowToRecord(row));
  }

  return records;
}
