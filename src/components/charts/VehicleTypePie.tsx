import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { TypeCount } from "@/data/evAggregations";
import { ChartSkeletonPie } from "./ChartSkeleton";

const CHART_HEIGHT = 280;

const COLORS = ["var(--primary)", "oklch(0.65 0.15 200)", "oklch(0.55 0.02 265)"];

function shortLabel(type: string): string {
  if (type.includes("Battery Electric")) return "BEV";
  if (type.includes("Plug-in Hybrid")) return "PHEV";
  return type.slice(0, 12);
}

interface VehicleTypePieProps {
  data: TypeCount[];
  loading?: boolean;
}

export function VehicleTypePie({ data, loading }: VehicleTypePieProps) {
  const chartData = data.map((d) => ({ name: shortLabel(d.type), value: d.count, fullName: d.type }));

  if (loading) return <ChartSkeletonPie />;

  return (
    <Card className="h-full border-border/80 bg-card/50">
      <CardContent className="p-6">
        <h3 className="mb-4 text-base font-semibold tracking-tight">Vehicle type</h3>
        {!chartData.length ? (
          <p className="text-muted-foreground text-sm">No data</p>
        ) : (
          <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: "0.5rem", border: "1px solid var(--border)" }}
                formatter={(value: number | undefined, _: unknown, item: unknown) => [
                  value != null ? value.toLocaleString() : "",
                  (item as { payload?: { fullName?: string } })?.payload?.fullName ?? "",
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
