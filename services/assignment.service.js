import Assignment from '../models/assignment.js';
import Survey from '../models/survey.js';
import User from '../models/user.js';

export const getAssignments = async (user) => {
  let query = {};
  if (user.role === 'employee') {
    query.employeeId = user.id;
  }

  return await Assignment.find(query)
    .populate('surveyId', 'title surveyLink')
    .populate('employeeId', 'name')
    .populate({
      path: 'surveyId',
      populate: {
        path: 'clientId',
        select: 'name'
      }
    });
};

export const createAssignment = async (assignmentData) => {
  const newAssignment = new Assignment(assignmentData);
  return await newAssignment.save();
};

export const updateAssignmentStatus = async (id, status, user) => {
    
  const assignment = await Assignment.findById(id);
  if (!assignment) throw new Error('Assignment not found');
  
  if (user.role === 'employee' && !assignment.employeeId.equals(user.id)) {
    throw new Error('Access denied');
  }

  const update = { status };
  if (status === 'completed') {
    update.completedAt = new Date();
  }

  return await Assignment.findByIdAndUpdate(
    id,
    { $set: update },
    { new: true }
  );
};