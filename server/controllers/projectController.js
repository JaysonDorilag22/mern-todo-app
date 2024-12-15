const Project = require('../models/projectModel');
const User = require('../models/userModel');
const crypto = require('crypto');
const { uploadImage } = require("../utils/uploadImage");
const cloudinary = require('../config/cloudinary');

// Generate a referral code
async function generateReferralCode() {
  let referralCode;
  let isDuplicate = true;

  while (isDuplicate) {
    referralCode = crypto.randomBytes(8).toString('hex');
    const existingProject = await Project.findOne({ referralCode });
    if (!existingProject) {
      isDuplicate = false;
    }
  }

  return referralCode;
}

// Create a new project
// Create a new project
const createProject = async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    const referralCode = await generateReferralCode(); // Await the generateReferralCode function

    let image = null;
    if (req.file) {
      const uploadResult = await uploadImage(req.file.path, "projects");
      image = {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
      };
    }

    const project = new Project({
      name,
      description,
      user: userId,
      image: image,
      referralCode,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Join a project using referral code
const joinProject = async (req, res) => {
  try {
    const { referralCode, userId } = req.body;

    const project = await Project.findOne({ referralCode });
    if (!project) {
      return res.status(404).json({ error: 'Invalid referral code' });
    }

    if (!project.isAcceptingUsers) {
      return res.status(403).json({ error: 'Project is not accepting new users' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!project.invitedUsers.includes(user._id)) {
      project.invitedUsers.push(user._id);
      await project.save();
    }

    res.status(200).json({ message: 'Joined project successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit a project
const editProject = async (req, res) => {
  try {
    const { name, description, isAcceptingUsers } = req.body;
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    if (isAcceptingUsers !== undefined) {
      project.isAcceptingUsers = isAcceptingUsers;
    }

    if (req.file) {
      // Delete the old image if it exists
      if (project.image && project.image.publicId) {
        await cloudinary.uploader.destroy(project.image.publicId);
      }

      // Upload the new image
      const uploadResult = await uploadImage(req.file.path, "projects");
      project.image = {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
      };
    }

    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete the project's image from Cloudinary if it exists
    if (project.image && project.image.publicId) {
      await cloudinary.uploader.destroy(project.image.publicId);
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a user from the project
const removeUserFromProject = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.user.toString() === userId) {
      return res.status(400).json({ error: 'Cannot remove the creator of the project' });
    }

    project.invitedUsers = project.invitedUsers.filter(id => id.toString() !== userId);
    await project.save();

    res.status(200).json({ message: 'User removed from project successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all projects a user has joined and created
// Get all projects a user has joined and created
const getUserProjects = async (req, res) => {
  try {
    const { userId } = req.params;

    const joinedProjects = await Project.find({ invitedUsers: userId }).populate('user', 'name email').populate('invitedUsers', 'name email');
    const createdProjects = await Project.find({ user: userId }).populate('user', 'name email').populate('invitedUsers', 'name email');

    res.status(200).json({
      joinedProjects,
      createdProjects,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get project details
const getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate('user', 'name email')
      .populate('invitedUsers', 'name email')
      .populate({
        path: 'todos',
        populate: {
          path: 'assignedUser',
          select: 'name email'
        }
      });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { createProject, joinProject, editProject, deleteProject, removeUserFromProject, getUserProjects, getProjectDetails };