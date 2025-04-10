import { Skeleton } from "@/components/ui/skeleton";

interface DetailSkeletonProps {
  titleWidth?: string;
  subtitleWidth?: string;
  sectionTitleWidth?: string;
  cardCount?: number;
}

export const DetailSkeleton = ({
  titleWidth = "w-3/4",
  subtitleWidth = "w-1/2",
  sectionTitleWidth = "w-1/4",
  cardCount = 6,
}: DetailSkeletonProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <Skeleton className={`h-8 ${titleWidth} mb-2`} />
        <Skeleton className={`h-6 ${subtitleWidth} mb-6`} />
        <div className="space-y-4">
          <div>
            <Skeleton className={`h-6 ${sectionTitleWidth} mb-4`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(cardCount)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-lg overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
