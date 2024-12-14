'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Edit } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from '@/hooks/use-toast'
import { editProject } from '@/redux/actions/projectActions'
import { showToast } from '@/utils/toastUtils'

export default function EditProjectModal({ project }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const [image, setImage] = useState(null)
  const [existingImage, setExistingImage] = useState(project.image?.url || null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?._id)
  const { toast } = useToast()

  useEffect(() => {
    console.log("User Id:", userId)
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('userId', userId)
    if (image) {
      formData.append('image', image)
    }

    try {
      await dispatch(editProject(project._id, formData))
      showToast(toast, 'Project updated successfully', '', 'success')
      setOpen(false)
      window.location.reload() // Refresh the page after the dialog is closed
    } catch (error) {
      showToast(toast, 'Error', error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      setExistingImage(null) // Clear existing image when a new image is selected
    }
  }

  const handleImageRemove = () => {
    setImage(null)
    setExistingImage(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Edit className=" h-4 w-4" />
          Edit Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update the details of your project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <Label htmlFor="image">Project Image</Label>
            <div className="mt-1 flex items-center space-x-4">
              <label htmlFor="image" className="cursor-pointer">
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Project"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : existingImage ? (
                    <img
                      src={existingImage}
                      alt="Project"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Upload className="text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">
                {image ? image.name : existingImage ? 'Current image' : 'Upload an image'}
              </span>
              {(image || existingImage) && (
                <Button type="button" onClick={handleImageRemove}>
                  Remove
                </Button>
              )}
            </div>
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
                  Updating...
                </div>
              ) : (
                "Update Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}