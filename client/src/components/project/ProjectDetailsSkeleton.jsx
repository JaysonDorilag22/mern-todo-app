import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

const ProjectDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative w-full lg:w-1/3 h-[200px] lg:h-[300px] rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Skeleton className="w-1/2 h-8 mb-4" />
                <Skeleton className="w-1/3 h-6 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Skeleton className="w-1/4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-1/4 h-8" />
                <Skeleton className="w-1/4 h-8" />
              </div>
              <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                <Skeleton className="w-1/4 h-4" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Skeleton className="w-1/2 h-6 mb-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Skeleton className="w-1/3 h-4 mb-2" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div>
                      <Skeleton className="w-1/2 h-4 mb-1" />
                      <Skeleton className="w-1/3 h-4" />
                    </div>
                  </div>
                </div>
                <div>
                  <Skeleton className="w-1/3 h-4 mb-2" />
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div>
                              <Skeleton className="w-1/2 h-4 mb-1" />
                              <Skeleton className="w-1/3 h-4" />
                            </div>
                          </div>
                          <Skeleton className="w-1/4 h-8" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="w-1/2 h-6 mb-4" />
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full pr-4">
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <Card key={index} className="flex items-start p-4 gap-4">
                        <Skeleton className="w-10 h-10 rounded" />
                        <div className="flex-1">
                          <Skeleton className="w-1/2 h-4 mb-1" />
                          <Skeleton className="w-1/3 h-4" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetailsSkeleton;