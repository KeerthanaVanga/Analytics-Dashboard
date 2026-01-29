import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { EVFilters } from "@/hooks/useEvData";
import { X } from "lucide-react";

interface FilterOptions {
  years: number[];
  makes: string[];
  models: string[];
  types: string[];
  counties: string[];
  cities: string[];
  states: string[];
}

interface FilterBarProps {
  filters: EVFilters;
  filterOptions: FilterOptions;
  onFilterChange: <K extends keyof EVFilters>(key: K, value: EVFilters[K]) => void;
  onClear: () => void;
  disabled?: boolean;
}

export function FilterBar({
  filters,
  filterOptions,
  onFilterChange,
  onClear,
  disabled,
}: FilterBarProps) {
  const hasActive = [
    filters.year != null,
    filters.make != null && filters.make !== "",
    filters.model != null && filters.model !== "",
    filters.vehicleType != null && filters.vehicleType !== "",
    filters.county != null && filters.county !== "",
    filters.city != null && filters.city !== "",
    filters.state != null && filters.state !== "",
  ].some(Boolean);

  return (
    <div className="space-y-2">
      {disabled ? (
        <Skeleton className="h-5 w-14" />
      ) : (
        <p className="text-muted-foreground text-sm font-medium">Filters</p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        {disabled ? (
          <>
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-32 rounded-lg" />
            <Skeleton className="h-9 w-36 rounded-lg" />
            <Skeleton className="h-9 w-44 rounded-lg" />
          </>
        ) : (
          <>
            <Select
              value={filters.year != null ? String(filters.year) : "all"}
              onValueChange={(v) => onFilterChange("year", v === "all" ? null : Number(v))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All years</SelectItem>
                {filterOptions.years.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.make ?? "all"}
              onValueChange={(v) => onFilterChange("make", v === "all" ? null : v)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All makes</SelectItem>
                {filterOptions.makes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.model ?? "all"}
              onValueChange={(v) => onFilterChange("model", v === "all" ? null : v)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All models</SelectItem>
                {filterOptions.models.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.vehicleType ?? "all"}
              onValueChange={(v) => onFilterChange("vehicleType", v === "all" ? null : v)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {filterOptions.types.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.county ?? "all"}
              onValueChange={(v) => onFilterChange("county", v === "all" ? null : v)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="County" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All counties</SelectItem>
                {filterOptions.counties.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.city ?? "all"}
              onValueChange={(v) => onFilterChange("city", v === "all" ? null : v)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cities</SelectItem>
                {filterOptions.cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.state ?? "all"}
              onValueChange={(v) => onFilterChange("state", v === "all" ? null : v)}
            >
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.states.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasActive && (
              <Button variant="outline" size="sm" onClick={onClear} className="gap-1.5">
                <X className="size-4" />
                Clear filters
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
