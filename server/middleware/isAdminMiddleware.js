const Project = require('../models/projectModel');

const isAdmin = async (req, res, next) => {
  try {
    const projectId = req.params.id || req.body.projectId; // Check both params and body for project ID
    const userId = req.user.id;

    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.user.toString() !== userId) {
      return res.status(403).json({ error: 'User is not the admin of this project' });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = isAdmin;