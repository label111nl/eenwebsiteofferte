import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes';
import freelancerRoutes from './routes/freelancerRoutes';
import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/authRoutes'; // Import the authentication routes
import sequelize from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);          // Add auth routes
app.use('/api/payments', paymentRoutes);
app.use('/api/freelancers', freelancerRoutes);
app.use('/api/admin', adminRoutes);

// Initialize Database and Start Server
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Use `alter: true` for updates without dropping tables
    console.log('Database connected and synced successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

initializeDatabase();
