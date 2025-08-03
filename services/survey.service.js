import Survey from '../models/survey.js';
import User from '../models/user.js';

export const getSurveys = async (user) => {
  let query = {};
  if (user.role === 'client') {
    query.clientId = user.id;
  }

  const surveys = await Survey.find(query).populate('clientId', 'name');
  return surveys.map(survey => ({
    ...survey.toObject(),
    clientName: survey.clientId.name
  }));
};

export const createSurvey = async (surveyData) => {
  const newSurvey = new Survey(surveyData);
  return await newSurvey.save();
};

export const updateSurveyStatus = async (id, status) => {
  return await Survey.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true }
  );
};