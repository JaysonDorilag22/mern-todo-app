'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from '@/hooks/use-toast'
import { createTodo } from '@/redux/actions/todoActions'
import { getUserProjects } from '@/redux/actions/projectActions'
import { showToast } from '@/utils/toastUtils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CreateTodoModal() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [documents, setDocuments] = useState([{ id: Date.now(), name: '', url: '' }])
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [assignedUser, setAssignedUser] = useState(null)
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?._id)
  const projects = useSelector((state) => state.userProjects.projects) || { createdProjects: [], joinedProjects: [] }
  const { toast } = useToast()

  useEffect(() => {
    if (userId) {
      dispatch(getUserProjects(userId))
    }
  }, [dispatch, userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('dueDate', dueDate)
    formData.append('userId', userId)
    formData.append('projectId', selectedProject ? selectedProject._id : null)
    formData.append('assignedUserId', assignedUser ? assignedUser._id : null)
    documents.forEach((doc, index) => {
      formData.append(`documents[${index}][name]`, doc.name)
      formData.append(`documents[${index}][url]`, doc.url)
    })
    images.forEach((image, index) => {
      formData.append('images', image)
    })

    // Log the form data
    console.log('Form Data:', {
      title,
      description,
      dueDate,
      userId,
      projectId: selectedProject ? selectedProject._id : null,
      assignedUserId: assignedUser ? assignedUser._id : null,
      documents,
      images
    })

    try {
      await dispatch(createTodo(formData))
      showToast(toast, 'Todo created successfully', '', 'success')
      setOpen(false)
      setTitle('')
      setDescription('')
      setDueDate('')
      setDocuments([{ id: Date.now(), name: '', url: '' }])
      setImages([])
      setSelectedProject(null)
      setAssignedUser(null)
    } catch (error) {
      showToast(toast, 'Error', error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)])
    }
  }

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleDocumentChange = (id, field, value) => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc) =>
        doc.id === id ? { ...doc, [field]: value } : doc
      )
    )
  }

  const handleAddDocument = () => {
    setDocuments([...documents, { id: Date.now(), name: '', url: '' }])
  }

  const handleRemoveDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new todo.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                className="mt-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                className="mt-1"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="mt-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="project">Project</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full text-left">{selectedProject ? selectedProject.name : 'Select Project'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Select Project</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Array.isArray(projects.createdProjects) && projects.createdProjects.map((project) => (
                    <DropdownMenuItem key={project._id} onClick={() => {
                      setSelectedProject(project)
                      console.log('Invited Users:', project.invitedUsers)
                    }}>
                      {project.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Label htmlFor="assignedUser">Assign User</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full text-left">{assignedUser ? assignedUser.name : 'Select User'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Select User</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {selectedProject && Array.isArray(selectedProject.invitedUsers) && selectedProject.invitedUsers.map((user) => (
                    <DropdownMenuItem key={user._id} onClick={() => setAssignedUser(user)}>
                      {user.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Label>Documents</Label>
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center space-x-2 mt-1">
                  <Input
                    placeholder="Document Name"
                    value={doc.name}
                    onChange={(e) => handleDocumentChange(doc.id, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Document URL"
                    value={doc.url}
                    onChange={(e) => handleDocumentChange(doc.id, 'url', e.target.value)}
                  />
                  <Button type="button" onClick={() => handleRemoveDocument(doc.id)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddDocument} className="mt-2">
                Add Document
              </Button>
            </div>
            <div>
              <Label htmlFor="images">Images</Label>
              <div className="mt-1 flex items-center space-x-4">
                <label htmlFor="images" className="cursor-pointer">
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <Upload className="text-gray-400" />
                  </div>
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {images.length > 0 ? `${images.length} image(s) selected` : 'Upload images'}
                </span>
              </div>
              {images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Todo"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-0 right-0"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button className="w-full mt-4" type="submit" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </div>
                ) : (
                  "Create Todo"
                )}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}