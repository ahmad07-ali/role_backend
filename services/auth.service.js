import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js';
import User from '../models/user.js';

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isValid = user.comparePassword(password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    }
  };
};

export const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = bcrypt.hashSync(userData.password, 10);
  const newUser = new User({
    ...userData,
    password: hashedPassword,
    createdAt: new Date()
  });

  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name
    }
  };
};