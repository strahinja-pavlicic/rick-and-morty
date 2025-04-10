import { Skeleton } from "@/components/ui/skeleton";

export const CharactersSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-md mx-auto mb-8">
        <Skeleton className="w-full h-10" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <Skeleton className="w-full h-64" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
