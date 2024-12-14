import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CheckSquare, Copy } from "lucide-react";
import gradient1 from "@assets/gradients/gradient1.png";
import gradient2 from "@assets/gradients/gradient2.png";
import gradient3 from "@assets/gradients/gradient3.png";
import gradient4 from "@assets/gradients/gradient4.png";
import gradient5 from "@assets/gradients/gradient5.png";
import { showToast } from "@/utils/toastUtils";
import { useToast } from "@/hooks/use-toast";
import ProjectCardSkeleton from "@/components/project/ProjectCardSkeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const gradients = [gradient1, gradient2, gradient3, gradient4, gradient5];

function ProjectCard({ project }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleCopyReferralCode = (e) => {
    e.stopPropagation(); // Prevent card click event
    navigator.clipboard.writeText(project.referralCode)
      .then(() => {
        showToast(toast, 'Success', 'Referral code copied to clipboard!', 'success');
      })
      .catch(err => {
        showToast(toast, 'Error', 'Failed to copy referral code', 'error');
        console.error('Failed to copy referral code: ', err);
      });
  };

  const handleCardClick = () => {
    navigate(`/project/${project._id}`);
  };

  if (loading) {
    return <ProjectCardSkeleton />;
  }

  return (
    <Card className="w-64 h-64 overflow-hidden cursor-pointer" onClick={handleCardClick}>
      <div className="relative w-full h-32">
        <img
          src={project.image?.url || randomGradient}
          alt={project.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => { e.target.src = randomGradient; }}
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopyReferralCode} 
                  className="rounded-lg p-2"
                >
                  <Copy size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Referral Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <CardContent className="p-4 flex flex-col justify-between h-32">
        <div>
          <h3 className="text-lg font-semibold mb-1 truncate">{project.name || 'No Name'}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description || 'No Description'}</p>
        </div>
        <CardFooter className="p-0 pt-2 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users size={14} />
            <span>{project.invitedUsers?.length || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckSquare size={14} />
            <span>{project.todos?.length || 0}</span>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default React.memo(ProjectCard);