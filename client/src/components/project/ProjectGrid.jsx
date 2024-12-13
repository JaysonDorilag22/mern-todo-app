import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';
import { getUserProjects } from '../../redux/actions/projectActions';

export default function ProjectGrid() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const userProjects = useSelector((state) => state.userProjects);
  const { error, projects } = userProjects;

  const fetchUserProjects = useCallback(() => {
    if (userId) {
      dispatch(getUserProjects(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    fetchUserProjects();
  }, [fetchUserProjects]);

  const createdProjects = useMemo(() => projects.createdProjects || [], [projects.createdProjects]);
  const joinedProjects = useMemo(() => projects.joinedProjects || [], [projects.joinedProjects]);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='pb-5 font-bold text-2xl'>Projects</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {createdProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
          {joinedProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}