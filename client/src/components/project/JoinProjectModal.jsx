'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { joinProject, getUserProjects } from '@/redux/actions/projectActions'
import { showToast } from '@/utils/toastUtils'
import { FilePlus2 } from 'lucide-react'
export default function JoinProjectModal() {
  const [open, setOpen] = useState(false)
  const [referralCode, setReferralCode] = useState('')
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
    const formData = {
      referralCode,
      userId,
    }

    try {
      await dispatch(joinProject(formData))
      showToast(toast, 'Joined project successfully', '', 'success')
      setOpen(false)
      // Clear form fields after successful submission
      setReferralCode('')
      // Re-fetch user projects
      dispatch(getUserProjects(userId))
    } catch (error) {
      showToast(toast, 'Error', error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
        <FilePlus2 className="mr-2 h-4 w-4" />
            Join Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Project</DialogTitle>
          <DialogDescription>
            Enter the referral code to join a project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="referralCode">Referral Code</Label>
            <Input
              id="referralCode"
              className="mt-1"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              required
            />
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
                  Joining...
                </div>
              ) : (
                "Join Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}