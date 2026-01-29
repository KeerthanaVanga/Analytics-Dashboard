import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { MakeCount } from "@/data/evAggregations";
import { ChartSkeletonHorizontalBar } from "./ChartSkeleton";

const CHART_HEIGHT = 280;

interface TopMakesBarProps {
  data: MakeCount[];
  loading?: boolean;
}

export function TopMakesBar({ data, loading }: TopMakesBarProps) {
  const chartData = data.map((d) => ({ make: d.make, count: d.count }));

  if (loading) return <ChartSkeletonHorizontalBar />;

  return (
    <Card className="h-full border-border/80 bg-card/50">
      <CardContent className="p-6">
        <h3 className="mb-4 text-base font-semibold tracking-tight">Top makes</h3>
        {!chartData.length ? (
          <p className="text-muted-foreground text-sm">No data</p>
        ) : (
          <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 8, left: 60, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
              <YAxis type="category" dataKey="make" width={56} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: "0.5rem", border: "1px solid var(--border)" }}
                formatter={(value: number | undefined) => [value != null ? value.toLocaleString() : "", "Vehicles"]}
              />
              <Bar dataKey="count" fill="var(--primary)" radius={[0, 6, 6, 0]} name="Vehicles" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
