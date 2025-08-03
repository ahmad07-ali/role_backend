import * as surveyService from '../services/survey.service.js';

export const getSurveys = async (req, res) => {
  try {
    const surveys = await surveyService.getSurveys(req.user);
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createSurvey = async (req, res) => {
  try {
    const newSurvey = await surveyService.createSurvey({
      ...req.body,
      clientId: req.user.id
    });
    res.json(newSurvey);
  } catch (error) {
    //  console.error('❌ Survey creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateSurveyStatus = async (req, res) => {
  try {
    const survey = await surveyService.updateSurveyStatus(req.params.id, req.body.status);
    if (!survey) return res.status(404).json({ message: 'Survey not found' });
    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};