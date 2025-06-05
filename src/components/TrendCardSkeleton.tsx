
import { Skeleton } from '@/components/ui/skeleton';

export const TrendCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    </div>
  );
};
