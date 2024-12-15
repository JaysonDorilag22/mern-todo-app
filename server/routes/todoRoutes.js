const express = require('express');
const { createTodo, getUserTodos, getTodoById, updateTodo, deleteTodo, assignTodo, updateTodoReview } = require('../controllers/todoController');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/create', protect, upload.array('images'), createTodo);
router.get('/user/:userId', protect, getUserTodos);
router.get('/:id', protect, getTodoById);
router.put('/update/:id', protect, upload.array('images'), updateTodo);
router.delete('/delete/:id', protect, deleteTodo);
router.post('/:projectId/assign-todo', protect, isAdmin, assignTodo);
router.put('/review/:id', protect, isAdmin, updateTodoReview); 

module.exports = router;