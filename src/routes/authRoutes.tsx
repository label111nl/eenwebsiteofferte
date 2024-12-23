import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }

  const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
});

export default router;
