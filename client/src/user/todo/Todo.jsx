import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateTodoModal from '@/components/todo/CreateTodoModal'
import { getUserTodos } from '@/redux/actions/todoActions'
import TodoCard from '@/components/todo/TodoCard'
import TodoCardSkeleton from '@/components/todo/TodoCardSkeleton'

export default function Todo() {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?._id)
  const todos = useSelector((state) => state.todos.todos)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      dispatch(getUserTodos(userId)).then(() => {
        setTimeout(() => {
          setLoading(false)
        }, 2000) // 2-second delay
      })
    }
  }, [dispatch, userId])

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="flex justify-between items-center mb-12">
        <CreateTodoModal />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => <TodoCardSkeleton key={index} />)
          : todos.map((todo) => <TodoCard key={todo._id} todo={todo} />)}
      </div>
    </div>
  )
}