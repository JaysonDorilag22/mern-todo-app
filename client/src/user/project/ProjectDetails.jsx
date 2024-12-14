import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getProjectDetails, deleteProject, removeUserFromProject, editProject } from '@/redux/actions/projectActions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, LinkIcon, Users, CheckSquare, Trash2, UserMinus, Edit, Copy, Clipboard } from 'lucide-react';
import EditProjectModal from '@/components/project/EditProjectModal';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/utils/toastUtils';
import DeleteProjectDialog from '@/components/project/DeleteProjectDialog';
import RemoveUserDialog from '@/components/project/RemoveUserDialog';
import ProjectDetailsSkeleton from '@/components/project/ProjectDetailsSkeleton';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';

export default function ProjectDetails({ setBreadcrumbs }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { projectDetails: project, loading, error } = useSelector((state) => state.userProjects);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [removeUserDialogOpen, setRemoveUserDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [removeUserLoading, setRemoveUserLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    dispatch(getProjectDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (project) {
      const pathnames = location.pathname.split("/").filter((x) => x);
      const newBreadcrumbs = pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return {
          to,
          label: isLast && project.name ? project.name : value,
          isLast,
        };
      });
      setBreadcrumbs(newBreadcrumbs);
    }
  }, [location, project, setBreadcrumbs]);

  const handleDeleteProject = async () => {
    setDeleteLoading(true);
    try {
      await dispatch(deleteProject(id));
      showToast(toast, 'Project deleted successfully', '', 'success');
      navigate('/project'); // Navigate to the projects list page
    } catch (error) {
      showToast(toast, 'Error', error.message, 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRemoveUser = async () => {
    setRemoveUserLoading(true);
    try {
      await dispatch(removeUserFromProject(id, selectedUser._id));
      showToast(toast, 'User removed successfully', '', 'success');
      setRemoveUserDialogOpen(false);
      dispatch(getProjectDetails(id)); // Refetch project details
    } catch (error) {
      showToast(toast, 'Error', error.message, 'error');
    } finally {
      setRemoveUserLoading(false);
    }
  };

  const handleSwitchChange = () => {
    setConfirmationDialogOpen(true);
  };

  const handleConfirmUpdate = async () => {
    setUpdateLoading(true);
    try {
      await dispatch(editProject(id, { isAcceptingUsers: !project.isAcceptingUsers }));
      showToast(toast, 'Project updated successfully', '', 'success');
      setConfirmationDialogOpen(false);
      dispatch(getProjectDetails(id)); // Refetch project details
    } catch (error) {
      showToast(toast, 'Error', error.message, 'error');c
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCopyReferralCode = () => {
  navigator.clipboard.writeText(project.referralCode)
    .then(() => {
      showToast(toast, 'Success', 'Referral code copied to clipboard!', 'success');
    })
    .catch(err => {
      showToast(toast, 'Error', error.message, 'error');c
    });
};

  if (loading) {
    return <ProjectDetailsSkeleton />;
  }

  if (error) {
    return <ErrorMessage error={error} reset={() => dispatch(getProjectDetails(id))} />;
  }

  if (!project) {
    return <p>No project details available</p>;
  }

  const isAdmin = user && project.user._id === user._id;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative w-full lg:w-1/3 h-[200px] lg:h-[300px] rounded-lg overflow-hidden">
              <img
                src={project.image?.url || "/placeholder.svg"}
                alt={project.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="text-2xl lg:text-3xl">{project.name}</CardTitle>
                  <Badge variant={project.isAcceptingUsers ? "default" : "secondary"}>
                    {project.isAcceptingUsers ? 'Accepting Users' : 'Closed'}
                  </Badge>
                </div>
                {isAdmin && (
                  <div className="flex items-center space-x-2">
                    <Switch id="accepting-users" checked={project.isAcceptingUsers} onCheckedChange={handleSwitchChange} />
                    <Label htmlFor="accepting-users">Accepting Users</Label>
                  </div>
                )}
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Created {new Date(project.createdAt).toLocaleDateString()}
              </div>

              {isAdmin && (
                <div className="flex items-center gap-2">
                  <EditProjectModal project={project} />
                  <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                    <Trash2 className="h-4 w-4" />
                    Delete Project
                  </Button>
                </div>
              )}

<div className="flex items-center gap-2 bg-muted p-2 rounded-md w-fit">
              <Button variant="ghost" size="sm" onClick={handleCopyReferralCode} className="p-0">
                <Clipboard className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">Referral Code:</span>
              <code className="rounded bg-background px-2 py-1 text-sm">
                {project.referralCode}
              </code>
            </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Project Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Project Owner</h4>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${project.user.email}`} />
                      <AvatarFallback>{project.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{project.user.name}</p>
                      <p className="text-sm text-muted-foreground">{project.user.email}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Invited Users ({project.invitedUsers.length})</h4>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      {project.invitedUsers.map((invitedUser, index) => (
                        <div key={index} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`https://avatar.vercel.sh/${invitedUser.email}`} />
                              <AvatarFallback>{invitedUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{invitedUser.name}</p>
                              <p className="text-sm text-muted-foreground">{invitedUser.email}</p>
                            </div>
                          </div>
                          {isAdmin && (
                            <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => {
                              setSelectedUser(invitedUser);
                              setRemoveUserDialogOpen(true);
                            }}>
                              <UserMinus className="h-4 w-4" />
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <CheckSquare className="h-5 w-5" />
                  To-Do List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full pr-4">
                  <div className="space-y-4">
                    {project.todos.map((todo) => (
                      <Card key={todo._id} className="flex items-start p-4 gap-4">
                        <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={todo.image || "/placeholder.svg"}
                            alt={todo.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{todo.title}</h4>
                          <Badge 
                            variant={
                              todo.status === 'Completed' ? 'default' : 
                              todo.status === 'In Progress' ? 'secondary' : 'outline'
                            }
                          >
                            {todo.status}
                          </Badge>
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

      <DeleteProjectDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDelete={handleDeleteProject}
        loading={deleteLoading}
      />

      <RemoveUserDialog
        open={removeUserDialogOpen}
        onOpenChange={setRemoveUserDialogOpen}
        onRemove={handleRemoveUser}
        loading={removeUserLoading}
      />

      <ConfirmationDialog
        open={confirmationDialogOpen}
        onOpenChange={setConfirmationDialogOpen}
        onConfirm={handleConfirmUpdate}
        loading={updateLoading}
        message={`Are you sure you want to ${project.isAcceptingUsers ? 'close' : 'open'} the project to accepting users?`}
      />
    </div>
  );
}