/**
 * Electric Vehicle record shape matching the CSV columns.
 * Used for typed access after parsing the public CSV.
 */
export interface EVRecord {
  vin: string;
  county: string;
  city: string;
  state: string;
  postalCode: string;
  modelYear: number;
  make: string;
  model: string;
  electricVehicleType: string;
  cafvEligibility: string;
  electricRange: number;
  baseMsrp: number;
  legislativeDistrict: string;
  dolVehicleId: string;
  vehicleLocation: string;
  electricUtility: string;
  censusTract2020: string;
}

export type EVTypeLabel = "BEV" | "PHEV" | "Other";
export const BEV_LABEL = "Battery Electric Vehicle (BEV)";
export const PHEV_LABEL = "Plug-in Hybrid Electric Vehicle (PHEV)";

export function getEVTypeKind(type: string): EVTypeLabel {
  if (type.includes("Battery Electric")) return "BEV";
  if (type.includes("Plug-in Hybrid")) return "PHEV";
  return "Other";
}
