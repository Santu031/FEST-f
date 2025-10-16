import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MemberCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar skeleton */}
          <Skeleton className="w-24 h-24 rounded-full" />

          {/* Info skeleton */}
          <div className="space-y-2 w-full">
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-5 w-1/2 mx-auto" />
            <div className="space-y-1 mt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-0">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-12" />
      </CardFooter>
    </Card>
  );
};

export default MemberCardSkeleton;
