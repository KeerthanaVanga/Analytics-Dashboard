import { useState, useMemo } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { EVRecord } from "@/data/ev";
import { Search } from "lucide-react";

interface EvTableProps {
  data: EVRecord[];
  loading?: boolean;
  pageSize?: number;
}

const COLUMNS: Array<{ id: keyof EVRecord; label: string; width?: string }> = [
  { id: "county", label: "County", width: "12%" },
  { id: "city", label: "City", width: "12%" },
  { id: "state", label: "State", width: "8%" },
  { id: "modelYear", label: "Year", width: "8%" },
  { id: "make", label: "Make", width: "12%" },
  { id: "model", label: "Model", width: "14%" },
  { id: "electricVehicleType", label: "Type", width: "22%" },
  { id: "electricRange", label: "Range (mi)", width: "10%" },
];

function rowMatchesSearch(
  row: EVRecord,
  searchTrim: string,
  columns: Array<{ id: keyof EVRecord }>
): boolean {
  if (!searchTrim) return true;
  const lower = searchTrim.toLowerCase();
  for (const col of columns) {
    const val = row[col.id];
    const str = val != null ? String(val).toLowerCase() : "";
    if (str.includes(lower)) return true;
  }
  return false;
}

export function EvTable({ data, loading, pageSize = 10 }: EvTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [search, setSearch] = useState("");

  const searchFiltered = useMemo(() => {
    const trim = search.trim();
    if (!trim) return data;
    return data.filter((row) => rowMatchesSearch(row, trim, COLUMNS));
  }, [data, search]);

  const sliced = useMemo(() => {
    const start = page * rowsPerPage;
    return searchFiltered.slice(start, start + rowsPerPage);
  }, [searchFiltered, page, rowsPerPage]);

  const typeShort = (type: string) => {
    if (type.includes("Battery Electric")) return "BEV";
    if (type.includes("Plug-in Hybrid")) return "PHEV";
    return type.slice(0, 15);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <Skeleton className="mb-4 h-7 w-32" />
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full caption-bottom border-collapse text-sm">
              <TableHeader>
                <TableRow>
                  {COLUMNS.map((col) => (
                    <TableHead key={col.id}>{col.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    {COLUMNS.map((col) => (
                      <TableCell key={col.id}>
                        <Skeleton className="h-5 w-full max-w-[80%]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </table>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Vehicle list</h2>
          <div className="relative w-full min-w-[240px] max-w-sm">
            <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search all columns…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="pl-9"
            />
          </div>
        </div>
        <div className="max-h-[440px] overflow-auto rounded-lg border">
          <table className="w-full caption-bottom border-collapse text-sm">
            <TableHeader>
              <TableRow className="border-b bg-card">
                {COLUMNS.map((col) => (
                  <TableHead key={col.id} style={{ width: col.width }}>
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sliced.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={COLUMNS.length} className="h-24 text-center text-muted-foreground">
                    No data
                  </TableCell>
                </TableRow>
              ) : (
                sliced.map((row, idx) => (
                  <TableRow key={`${row.vin}-${row.dolVehicleId}-${idx}`}>
                    <TableCell>{row.county}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell>{row.modelYear}</TableCell>
                    <TableCell>{row.make}</TableCell>
                    <TableCell>{row.model}</TableCell>
                    <TableCell>{typeShort(row.electricVehicleType)}</TableCell>
                    <TableCell>{row.electricRange > 0 ? row.electricRange : "—"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            Total: <span className="font-medium text-foreground">{searchFiltered.length.toLocaleString()}</span>{" "}
            {searchFiltered.length === 1 ? "row" : "rows"}
            {searchFiltered.length > 0 && (
              <>
                {" "}
                (showing {page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, searchFiltered.length)})
              </>
            )}
          </p>
          <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Rows per page:</span>
            <Select
              value={String(rowsPerPage)}
              onValueChange={(v) => {
                setRowsPerPage(Number(v));
                setPage(0);
              }}
            >
              <SelectTrigger className="h-9 w-[72px] rounded-lg border-[#B2D8C9] bg-white shadow-sm focus:ring-2 focus:ring-[#B2D8C9]/30 dark:border-emerald-200/50 dark:bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-w-[80px] rounded-lg border-border bg-muted/30 px-3 py-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground disabled:bg-muted/20 disabled:text-muted-foreground/60"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-w-[80px] rounded-lg border-border bg-muted/30 px-3 py-2 text-foreground hover:bg-muted/50 disabled:bg-muted/20 disabled:text-muted-foreground/60"
              disabled={(page + 1) * rowsPerPage >= searchFiltered.length}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
