import { Car } from "lucide-react";
import { useEvData } from "@/hooks/useEvData";
import { KpiGrid } from "@/components/KpiGrid";
import { FilterBar } from "@/components/FilterBar";
import { VehiclesByYear } from "@/components/charts/VehiclesByYear";
import { TopMakesBar } from "@/components/charts/TopMakesBar";
import { VehicleTypePie } from "@/components/charts/VehicleTypePie";
import { RangeHistogram } from "@/components/charts/RangeHistogram";
import { EvTable } from "@/components/EvTable";

function App() {
  const {
    filteredData,
    summary,
    loading,
    error,
    filters,
    filterOptions,
    setFilter,
    clearFilters,
  } = useEvData();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-14 items-center gap-2 px-4">
          <Car className="size-7 text-primary" />
          <h1 className="text-lg font-semibold tracking-tight">
            Electric Vehicle Population Analytics
          </h1>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl space-y-6 px-4 py-6">
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <KpiGrid summary={summary} loading={loading} />

        <section className="space-y-2">
          <FilterBar
            filters={filters}
            filterOptions={filterOptions}
            onFilterChange={setFilter}
            onClear={clearFilters}
            disabled={loading}
          />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <VehiclesByYear data={summary.byYear} loading={loading} />
          <TopMakesBar data={summary.topMakes} loading={loading} />
          <VehicleTypePie data={summary.byType} loading={loading} />
          <RangeHistogram data={summary.rangeBuckets} loading={loading} />
        </section>

        <section>
          <EvTable data={filteredData} loading={loading} pageSize={10} />
        </section>
      </main>
    </div>
  );
}

export default App;
