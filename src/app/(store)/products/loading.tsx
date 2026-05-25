import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 pb-24 pt-32 sm:px-6">
      <section className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Skeleton className="mx-auto h-4 w-40" />
          <Skeleton className="mx-auto mt-5 h-16 w-full" />
          <Skeleton className="mx-auto mt-5 h-5 w-2/3" />
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="p-3">
              <Skeleton className="aspect-[5/3] w-full" />
              <Skeleton className="mt-5 h-6 w-3/4" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-5 h-10 w-full" />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
