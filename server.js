import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import surveyRoutes from './routes/survey.routes.js';
import assignmentRoutes from './routes/assignment.routes.js';
import responseRoutes from './routes/response.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import { createAdminUser } from './utils/initialSetup.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB().then(() => {
  console.log('MongoDB is connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});
// Initial setup
createAdminUser();

// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});