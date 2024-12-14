const express = require('express');
const { createProject, joinProject, editProject, deleteProject, getUserProjects, removeUserFromProject, getProjectDetails } = require('../controllers/projectController');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/create', protect, upload.single('image'), createProject); 
router.post('/join', protect, joinProject);
router.put('/edit/:id', protect, isAdmin, upload.single('image'), editProject);
router.delete('/delete/:id', protect, isAdmin, deleteProject);
router.post('/remove-user', protect, isAdmin, removeUserFromProject);
router.get('/user/:userId', protect, getUserProjects);
router.get('/:id', protect, getProjectDetails);

module.exports = router;
