import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ChartCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="h-full border-border/80 bg-card/50">
      <CardContent className="p-6">
        <Skeleton className="mb-4 h-6 w-48" />
        {children}
      </CardContent>
    </Card>
  );
}

export function ChartSkeletonBar() {
  const heights = [40, 65, 45, 80, 55, 70, 50, 90, 60];
  return (
    <ChartCard>
      <div className="flex h-[280px] items-end gap-1 px-1">
        {heights.map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${h}%`, minHeight: 20 }}
          />
        ))}
      </div>
    </ChartCard>
  );
}

export function ChartSkeletonHistogram() {
  const heights = [25, 45, 70, 88, 95, 85, 72, 58, 42, 35, 28, 22];
  return (
    <ChartCard>
      <div className="flex h-[280px] items-end gap-0.5 px-1">
        {heights.map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ height: `${h}%`, minHeight: 16 }}
          />
        ))}
      </div>
    </ChartCard>
  );
}

export function ChartSkeletonHorizontalBar() {
  const widths = [85, 60, 72, 45, 90, 55, 78, 65];
  return (
    <ChartCard>
      <div className="flex h-[280px] flex-col justify-evenly gap-3 py-2">
        {widths.map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-16 shrink-0" />
            <Skeleton className="h-5 rounded-r-md" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

export function ChartSkeletonPie() {
  return (
    <ChartCard>
      <div className="relative flex h-[280px] items-center justify-center">
        <Skeleton className="size-44 rounded-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-4 w-9" />
        </div>
        <div className="absolute right-6 top-1/2 flex flex-col gap-2 -translate-y-1/2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="size-3 rounded-full" />
              <Skeleton className="h-4 w-14" />
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
