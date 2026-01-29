import type { EVRecord } from "./ev";
import { getEVTypeKind } from "./ev";

export interface YearCount {
  year: number;
  count: number;
}

export interface MakeCount {
  make: string;
  count: number;
}

export interface TypeCount {
  type: string;
  count: number;
}

export interface RangeBucket {
  label: string;
  min: number;
  max: number;
  count: number;
}

export interface EVSummary {
  total: number;
  bevCount: number;
  phevCount: number;
  otherCount: number;
  avgElectricRange: number;
  byYear: YearCount[];
  topMakes: MakeCount[];
  byType: TypeCount[];
  rangeBuckets: RangeBucket[];
  topCounties: { county: string; state: string; count: number }[];
}

const RANGE_BUCKET_SIZE = 50;
const TOP_MAKES_N = 10;
const TOP_COUNTIES_N = 8;

function roundTo1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function computeSummary(records: EVRecord[]): EVSummary {
  if (records.length === 0) {
    return {
      total: 0,
      bevCount: 0,
      phevCount: 0,
      otherCount: 0,
      avgElectricRange: 0,
      byYear: [],
      topMakes: [],
      byType: [],
      rangeBuckets: [],
      topCounties: [],
    };
  }

  const yearMap = new Map<number, number>();
  const makeMap = new Map<string, number>();
  const typeMap = new Map<string, number>();
  const countyKeyMap = new Map<string, number>();
  let rangeSum = 0;
  let rangeCount = 0;

  for (const r of records) {
    yearMap.set(r.modelYear, (yearMap.get(r.modelYear) ?? 0) + 1);
    makeMap.set(r.make, (makeMap.get(r.make) ?? 0) + 1);
    typeMap.set(r.electricVehicleType, (typeMap.get(r.electricVehicleType) ?? 0) + 1);
    const countyKey = `${r.county}|${r.state}`;
    countyKeyMap.set(countyKey, (countyKeyMap.get(countyKey) ?? 0) + 1);
    if (r.electricRange > 0) {
      rangeSum += r.electricRange;
      rangeCount += 1;
    }
  }

  const byYear: YearCount[] = Array.from(yearMap.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

  const makeEntries = Array.from(makeMap.entries()).map(([make, count]) => ({ make, count }));
  makeEntries.sort((a, b) => b.count - a.count);
  const topMakes: MakeCount[] = makeEntries.slice(0, TOP_MAKES_N);

  const byType: TypeCount[] = Array.from(typeMap.entries()).map(([type, count]) => ({ type, count }));

  const bevCount = records.filter((r) => getEVTypeKind(r.electricVehicleType) === "BEV").length;
  const phevCount = records.filter((r) => getEVTypeKind(r.electricVehicleType) === "PHEV").length;
  const otherCount = records.length - bevCount - phevCount;

  const rangeBuckets: RangeBucket[] = [];
  const maxRange = Math.max(...records.map((r) => r.electricRange), 0);
  let bucketMax = 0;
  while (bucketMax < maxRange + RANGE_BUCKET_SIZE) {
    const min = bucketMax;
    bucketMax += RANGE_BUCKET_SIZE;
    const label = min === 0 ? "0" : `${min}-${bucketMax}`;
    const count = records.filter((r) => r.electricRange >= min && r.electricRange < bucketMax).length;
    rangeBuckets.push({ label, min, max: bucketMax, count });
  }
  if (rangeBuckets.length === 0) {
    rangeBuckets.push({ label: "0", min: 0, max: RANGE_BUCKET_SIZE, count: records.length });
  }

  const countyEntries = Array.from(countyKeyMap.entries()).map(([key, count]) => {
    const [county, state] = key.split("|");
    return { county, state, count };
  });
  countyEntries.sort((a, b) => b.count - a.count);
  const topCounties = countyEntries.slice(0, TOP_COUNTIES_N);

  const avgElectricRange = rangeCount > 0 ? roundTo1(rangeSum / rangeCount) : 0;

  return {
    total: records.length,
    bevCount,
    phevCount,
    otherCount,
    avgElectricRange,
    byYear,
    topMakes,
    byType,
    rangeBuckets,
    topCounties,
  };
}
