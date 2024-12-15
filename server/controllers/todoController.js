const Todo = require('../models/todoModel');
const User = require('../models/userModel');
const { uploadImages } = require("../utils/uploadImage");
const cloudinary = require('../config/cloudinary');
const Project = require('../models/projectModel');
// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, userId, projectId, assignedUserId, documents, note, submitted, status } = req.body;

    let images = [];
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(file => file.path);
      images = await uploadImages(imagePaths, "todos");
    }

    // Log the received data for debugging
    console.log('Received Data:', {
      title,
      description,
      dueDate,
      userId,
      projectId,
      assignedUserId,
      documents,
      note,
      submitted,
      status
    });

    // Validate projectId and assignedUserId
    const project = projectId && projectId !== 'none' ? projectId : null;
    const assignedUser = assignedUserId && assignedUserId !== '' ? assignedUserId : null;

    // Log the processed project and assignedUser
    console.log('Processed Data:', {
      project,
      assignedUser
    });

    const todo = new Todo({
      title,
      description,
      dueDate,
      user: userId, // Use userId directly as a string
      project: project || null,
      assignedUser: assignedUser || null,
      images,
      documents: documents || [],
      note: note || '',
      submitted: submitted || false,
      status: status || 'On Time',
    });

    await todo.save();

    // Add the todo to the project's todos array
    if (project) {
      await Project.findByIdAndUpdate(project, { $push: { todos: todo._id } });
    }

    const populatedTodo = await Todo.findById(todo._id).populate('user', 'name email').populate('project', 'name').populate('assignedUser', 'name email');
    res.status(201).json(populatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all todos for a user
const getUserTodos = async (req, res) => {
  try {
    const { userId } = req.params;

    const todos = await Todo.find({ user: userId }) // Use userId directly as a string
      .populate('project', 'name')
      .populate('assignedUser', 'name email');

    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single todo by ID
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id)
      .populate('project', 'name')
      .populate('assignedUser', 'name email');
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { title, description, completed, dueDate, assignedUserId, documents, note, submitted, status } = req.body;
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.completed = completed !== undefined ? completed : todo.completed;
    todo.dueDate = dueDate || todo.dueDate;
    todo.assignedUser = assignedUserId || todo.assignedUser;
    todo.documents = documents || todo.documents;
    todo.note = note || todo.note;
    todo.submitted = submitted !== undefined ? submitted : todo.submitted;
    todo.status = status || todo.status;

    if (req.files && req.files.length > 0) {
      // Delete old images
      for (const image of todo.images) {
        await cloudinary.uploader.destroy(image.publicId);
      }

      // Upload new images
      const imagePaths = req.files.map(file => file.path);
      todo.images = await uploadImages(imagePaths, "todos");
    }

    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Delete images from Cloudinary
    for (const image of todo.images) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Assign a todo to a user
const assignTodo = async (req, res) => {
  try {
    const { todoId, assignedUserId } = req.body;

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.assignedUser = assignedUserId;
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update note and review status of a todo
const updateTodoReview = async (req, res) => {
  try {
    const { note, reviewStatus } = req.body;
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.note = note || todo.note;
    todo.reviewStatus = reviewStatus || todo.reviewStatus;

    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTodo, getUserTodos, getTodoById, updateTodo, deleteTodo, assignTodo, updateTodoReview };