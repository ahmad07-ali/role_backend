import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['assigned', 'in-progress', 'completed', 'submitted'], default: 'assigned' },
  assignedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  submittedAt: { type: Date }
});

export default mongoose.model('Assignment', assignmentSchema);