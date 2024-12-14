import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProjectCardSkeleton = () => {
  return (
    <Card className="w-64 h-64 overflow-hidden">
      <div className="relative w-full h-32">
        <Skeleton className="absolute top-0 left-0 w-full h-full" />
      </div>
      <CardContent className="p-4 flex flex-col justify-between h-32">
        <div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
        <CardFooter className="p-0 pt-2 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center space-x-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-8" />
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProjectCardSkeleton;