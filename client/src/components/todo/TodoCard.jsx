import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import { format } from 'date-fns'
import TodoCardSkeleton from './TodoCardSkeleton'

const TodoCard = ({ todo }) => {
  return (
    <Card key={todo._id} className="w-full max-w-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{todo.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{todo.description}</p>
        <div className="flex justify-between items-center text-sm">
          <span>Due: {format(new Date(todo.dueDate), 'MMM dd, yyyy')}</span>
          <Badge variant={todo.status === 'On Time' ? 'default' : 'destructive'}>
            {todo.status}
          </Badge>
        </div>
        {todo.project && (
          <div className="flex justify-between items-center text-sm">
            <Badge variant="default">{todo.project.name}</Badge>
          </div>
        )}
        {todo.assignedUser && (
          <div className="flex justify-between items-center text-sm">
            <span>Assigned to: {todo.assignedUser.name}</span>
          </div>
        )}
        <div className="flex space-x-2 overflow-x-auto py-2">
          {todo.images.map((image) => (
            <img
              key={image._id}
              src={image.url}
              alt="Todo image"
              width={50}
              height={50}
              className="rounded-md object-cover"
            />
          ))}
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Documents:</h4>
          {todo.documents.map((doc) => (
            <a
              key={doc._id}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-600 hover:underline"
            >
              <FileText className="mr-2 h-4 w-4" />
              {doc.name}
            </a>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button variant="outline" size="sm">View</Button>
      </CardFooter>
    </Card>
  )
}

export default TodoCard