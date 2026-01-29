import { useState, useEffect, useMemo } from "react";
import { loadEVData } from "@/data/evLoad";
import type { EVRecord } from "@/data/ev";
import { computeSummary, type EVSummary } from "@/data/evAggregations";

export interface EVFilters {
  year: number | null;
  make: string | null;
  model: string | null;
  vehicleType: string | null;
  county: string | null;
  city: string | null;
  state: string | null;
}

const defaultFilters: EVFilters = {
  year: null,
  make: null,
  model: null,
  vehicleType: null,
  county: null,
  city: null,
  state: null,
};

export function useEvData() {
  const [rawData, setRawData] = useState<EVRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EVFilters>(defaultFilters);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    loadEVData()
      .then((data) => {
        if (!cancelled) setRawData(data);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load data");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredData = useMemo(() => {
    let list = rawData;
    if (filters.year != null) list = list.filter((r) => r.modelYear === filters.year);
    if (filters.make != null && filters.make !== "") list = list.filter((r) => r.make === filters.make);
    if (filters.model != null && filters.model !== "") list = list.filter((r) => r.model === filters.model);
    if (filters.vehicleType != null && filters.vehicleType !== "") list = list.filter((r) => r.electricVehicleType === filters.vehicleType);
    if (filters.county != null && filters.county !== "") list = list.filter((r) => r.county === filters.county);
    if (filters.city != null && filters.city !== "") list = list.filter((r) => r.city === filters.city);
    if (filters.state != null && filters.state !== "") list = list.filter((r) => r.state === filters.state);
    return list;
  }, [rawData, filters]);

  const summary: EVSummary = useMemo(() => computeSummary(filteredData), [filteredData]);

  const filterOptions = useMemo(() => {
    const years = Array.from(new Set(rawData.map((r) => r.modelYear))).filter(Boolean).sort((a, b) => b - a);
    const makes = Array.from(new Set(rawData.map((r) => r.make))).filter(Boolean).sort();
    const models = Array.from(new Set(rawData.map((r) => r.model))).filter(Boolean).sort();
    const types = Array.from(new Set(rawData.map((r) => r.electricVehicleType))).filter(Boolean).sort();
    const counties = Array.from(new Set(rawData.map((r) => r.county))).filter(Boolean).sort();
    const cities = Array.from(new Set(rawData.map((r) => r.city))).filter(Boolean).sort();
    const states = Array.from(new Set(rawData.map((r) => r.state))).filter(Boolean).sort();
    return { years, makes, models, types, counties, cities, states };
  }, [rawData]);

  const setFilter = <K extends keyof EVFilters>(key: K, value: EVFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(defaultFilters);

  return {
    rawData,
    filteredData,
    summary,
    loading,
    error,
    filters,
    filterOptions,
    setFilter,
    clearFilters,
  };
}
