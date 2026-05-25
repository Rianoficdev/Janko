import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProductsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-4 h-12 w-80" />
        <Skeleton className="mt-3 h-5 w-[520px] max-w-full" />
      </div>
      <Card className="space-y-3 p-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-14 w-full" />
        ))}
      </Card>
    </div>
  );
}
