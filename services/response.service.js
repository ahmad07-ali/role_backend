import Response from '../models/response.js';
import Assignment from '../models/assignment.js';
import Survey from '../models/survey.js';
import User from '../models/user.js';

export const getResponses = async (user) => {
  let query = {};
  
  if (user.role === 'client') {
    const surveys = await Survey.find({ clientId: user.id });
    query.surveyId = { $in: surveys.map(s => s._id) };
  }

  return await Response.find(query)
    .populate('surveyId', 'title')
    .populate('employeeId', 'name');
};

export const createResponse = async (responseData) => {
  const newResponse = new Response(responseData);
  await newResponse.save();
  
  await Assignment.findByIdAndUpdate(
    responseData.assignmentId,
    { 
      $set: { 
        status: 'submitted',
        submittedAt: new Date()
      }
    }
  );

  return newResponse;
};