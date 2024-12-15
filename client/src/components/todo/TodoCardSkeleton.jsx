import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText } from 'lucide-react'

const TodoCardSkeleton = () => {
  return (
    <Card className="w-full max-w-md overflow-hidden animate-pulse">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-3/4 rounded" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full rounded" />
        <div className="flex justify-between items-center text-sm">
          <Skeleton className="h-4 w-1/2 rounded" />
          <Skeleton className="h-4 w-1/4 rounded" />
        </div>
        <div className="flex justify-between items-center text-sm">
          <Skeleton className="h-4 w-1/4 rounded" />
        </div>
        <div className="flex space-x-2 overflow-x-auto py-2">
          <Skeleton className="h-20 w-20 rounded-md" />
          <Skeleton className="h-20 w-20 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4 rounded" />
          <div className="flex items-center text-sm hover:underline">
            {/* <FileText className="mr-2 h-4 w-4 bg-gray-300 rounded" /> */}
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Skeleton className="h-8 w-16 rounded" />
      </CardFooter>
    </Card>
  )
}

export default TodoCardSkeleton