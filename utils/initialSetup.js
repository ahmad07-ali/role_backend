import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@system.com' });
    if (!adminExists) {
      const hashedPassword = bcrypt.hashSync('admin123', 10);
      await User.create({
        email: 'admin@system.com',
        password: hashedPassword,
        role: 'admin',
        name: 'System Administrator'
      });
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};