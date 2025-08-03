import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responses: [{ type: Object }],
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Response', responseSchema);