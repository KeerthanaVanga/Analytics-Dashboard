import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { RangeBucket } from "@/data/evAggregations";
import { ChartSkeletonHistogram } from "./ChartSkeleton";

const CHART_HEIGHT = 280;

interface RangeHistogramProps {
  data: RangeBucket[];
  loading?: boolean;
}

export function RangeHistogram({ data, loading }: RangeHistogramProps) {
  const chartData = data.map((d) => ({ label: d.label, count: d.count, range: `${d.min}-${d.max} mi` }));

  if (loading) return <ChartSkeletonHistogram />;

  return (
    <Card className="h-full border-border/80 bg-card/50">
      <CardContent className="p-6">
        <h3 className="mb-4 text-base font-semibold tracking-tight">Electric range distribution (miles)</h3>
        {!chartData.length ? (
          <p className="text-muted-foreground text-sm">No data</p>
        ) : (
          <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: "0.5rem", border: "1px solid var(--border)" }}
                formatter={(value: number | undefined) => [value != null ? value.toLocaleString() : "", "Vehicles"]}
                labelFormatter={(_, payload) => {
                  const p = Array.isArray(payload) ? payload[0] : undefined;
                  return (p && typeof p === "object" && "payload" in p && p.payload && typeof p.payload === "object" && "range" in p.payload)
                    ? String((p.payload as { range: string }).range)
                    : "";
                }}
              />
              <Bar dataKey="count" fill="oklch(0.55 0.15 280)" radius={[6, 6, 0, 0]} name="Vehicles" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
