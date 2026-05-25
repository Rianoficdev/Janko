import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 pb-24 pt-32 sm:px-6">
      <section className="mx-auto max-w-7xl">
        <Skeleton className="mx-auto h-4 w-32" />
        <Skeleton className="mx-auto mt-5 h-16 max-w-2xl" />
        <Skeleton className="mx-auto mt-10 h-14 max-w-2xl" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="p-3">
              <Skeleton className="aspect-[5/3] w-full" />
              <Skeleton className="mt-5 h-6 w-3/4" />
              <Skeleton className="mt-3 h-4 w-full" />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
