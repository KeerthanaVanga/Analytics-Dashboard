import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { EVSummary } from "@/data/evAggregations";
import {
  Car,
  Battery,
  Plug,
  TrendingUp,
  Award,
} from "lucide-react";

interface KpiGridProps {
  summary: EVSummary;
  loading?: boolean;
}

const kpiCards: Array<{
  key: keyof EVSummary;
  label: string;
  format: (s: EVSummary) => string;
  icon: React.ReactNode;
}> = [
  {
    key: "total",
    label: "Total vehicles",
    format: (s) => s.total.toLocaleString(),
    icon: <Car className="size-5 text-primary" />,
  },
  {
    key: "bevCount",
    label: "Battery electric (BEV)",
    format: (s) => s.bevCount.toLocaleString(),
    icon: <Battery className="size-5 text-emerald-600 dark:text-emerald-400" />,
  },
  {
    key: "phevCount",
    label: "Plug-in hybrid (PHEV)",
    format: (s) => s.phevCount.toLocaleString(),
    icon: <Plug className="size-5 text-teal-600 dark:text-teal-400" />,
  },
  {
    key: "avgElectricRange",
    label: "Avg electric range (mi)",
    format: (s) => (s.avgElectricRange > 0 ? `${s.avgElectricRange}` : "—"),
    icon: <TrendingUp className="size-5 text-primary" />,
  },
  {
    key: "topMakes",
    label: "Top make",
    format: (s) => (s.topMakes[0]?.make ?? "—"),
    icon: <Award className="size-5 text-primary" />,
  },
];

export function KpiGrid({ summary, loading }: KpiGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {kpiCards.map(({ label, format, icon }) => (
        <Card key={label} className="border-border/80 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-5">
            {loading ? (
              <>
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
              </>
            ) : (
              <>
                <p className="text-muted-foreground mb-1 text-xs font-medium uppercase tracking-wider">
                  {label}
                </p>
                <p className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                  {icon}
                  {format(summary)}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
