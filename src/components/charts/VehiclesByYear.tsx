import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { YearCount } from "@/data/evAggregations";
import { ChartSkeletonBar } from "./ChartSkeleton";

const CHART_HEIGHT = 280;

interface VehiclesByYearProps {
  data: YearCount[];
  loading?: boolean;
}

export function VehiclesByYear({ data, loading }: VehiclesByYearProps) {
  const chartData = data.map((d) => ({ year: String(d.year), count: d.count }));

  if (loading) return <ChartSkeletonBar />;

  return (
    <Card className="h-full border-border/80 bg-card/50">
      <CardContent className="p-6">
        <h3 className="mb-4 text-base font-semibold tracking-tight">Vehicles by model year</h3>
        {!chartData.length ? (
          <p className="text-muted-foreground text-sm">No data</p>
        ) : (
          <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: "0.5rem", border: "1px solid var(--border)" }}
                formatter={(value: number | undefined) => [value != null ? value.toLocaleString() : "", "Count"]}
              />
              <Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} name="Vehicles" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
