import * as responseService from '../services/response.service.js';

export const getResponses = async (req, res) => {
  try {
    const responses = await responseService.getResponses(req.user);
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createResponse = async (req, res) => {
  try {
    const newResponse = await responseService.createResponse({
      ...req.body,
      employeeId: req.user.id
    });
    res.json(newResponse);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};