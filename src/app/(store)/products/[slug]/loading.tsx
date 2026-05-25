import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 pb-24 pt-28 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
        <Skeleton className="aspect-[4/3] w-full" />
        <Card className="p-6">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="mt-6 h-16 w-full" />
          <Skeleton className="mt-5 h-24 w-full" />
          <Skeleton className="mt-8 h-12 w-56" />
          <Skeleton className="mt-8 h-12 w-full" />
        </Card>
      </div>
    </div>
  );
}
