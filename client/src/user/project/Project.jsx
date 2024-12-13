import CreateProjectModal from '@/components/project/CreateProjectModal'
import JoinProjectModal from '@/components/project/JoinProjectModal'
import ProjectGrid from '@/components/project/ProjectGrid'
import React from 'react'

export default function Project() {
  return (
    <div className="container mx-auto px-4 py-12">
    <header className="flex justify-between items-center mb-12">
      <CreateProjectModal />
      <JoinProjectModal />
    </header>
    <ProjectGrid />
  </div>
  )
}
