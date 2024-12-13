const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

// Configure CORS to allow credentials and specify the correct origin
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's localhost URL
  credentials: true, // Allow credentials (cookies) to be sent
}));

app.use(express.json());
app.use(cookieParser()); // Ensure cookie-parser middleware is used

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});