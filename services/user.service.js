import User from '../models/user.js';
import bcrypt from 'bcryptjs'; // ✅ Required

export const getAllUsers = async () => {
  return await User.find({}, { password: 0 });
};

export const getEmployees = async () => {
  return await User.find({ role: 'employee' }, { password: 0 });
};

export const createEmployee = async (employeeData) => {
  const hashedPassword = bcrypt.hashSync(employeeData.password, 10);
  const newEmployee = new User({
    ...employeeData,
    password: hashedPassword,
    role: 'employee'
  });
  return await newEmployee.save();
};

export const updateEmployee = async (id, updateData) => {
  return await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, select: '-password' }
  );
};

export const deleteEmployee = async (id) => {
  return await User.findOneAndDelete({ _id: id, role: 'employee' });
};
