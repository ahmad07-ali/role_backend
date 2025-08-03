import * as assignmentService from '../services/assignment.service.js';

export const getAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.getAssignments(req.user);
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createAssignment = async (req, res) => {
  try {
    const newAssignment = await assignmentService.createAssignment(req.body);
    res.json(newAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAssignmentStatus = async (req, res) => {
  try {
    const assignment = await assignmentService.updateAssignmentStatus(
      req.params.id,
      req.body.status,
      req.user
    );
    res.json(assignment);
  } catch (error) {
    if (error.message === 'Assignment not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Access denied') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};