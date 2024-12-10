const express = require('express');
const { signUp, signIn, testapi } = require('../controllers/authController');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/signup', upload.single('avatar'), signUp);
router.post('/signin', signIn);
router.post('/', protect, testapi);

module.exports = router;