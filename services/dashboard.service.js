import Survey from '../models/survey.js';
import Assignment from '../models/assignment.js';
import Response from '../models/response.js';
import User from '../models/user.js';

export const getDashboardStats = async (user) => {
    let stats = {};

    if (user.role === 'admin') {
        const [totalSurveys, totalEmployees, totalClients, totalAssignments, pendingSurveys, completedSurveys] = await Promise.all([
            Survey.countDocuments(),
            User.countDocuments({ role: 'employee' }),
            User.countDocuments({ role: 'client' }),
            Assignment.countDocuments(),
            Survey.countDocuments({ status: 'pending' }),
            Survey.countDocuments({ status: 'completed' })
        ]);

        stats = {
            totalSurveys,
            totalEmployees,
            totalClients,
            totalAssignments,
            pendingSurveys,
            completedSurveys
        };
    } else if (user.role === 'client') {
        const [clientSurveys, clientResponses] = await Promise.all([
            Survey.find({ clientId: user.id }),
            Response.find({ surveyId: { $in: (await Survey.find({ clientId: user.id })).map(s => s._id) } })])


        stats = {
            totalSurveys: clientSurveys.length,
            pendingSurveys: clientSurveys.filter(s => s.status === 'pending').length,
            inProgressSurveys: clientSurveys.filter(s => s.status === 'in-progress').length,
            completedSurveys: clientSurveys.filter(s => s.status === 'completed').length,
            totalResponses: clientResponses.length
        };
    } else if (user.role === 'employee') {
        const employeeAssignments = await Assignment.find({ employeeId: user.id });

        stats = {
            totalAssignments: employeeAssignments.length,
            pendingAssignments: employeeAssignments.filter(a => a.status === 'assigned').length,
            inProgressAssignments: employeeAssignments.filter(a => a.status === 'in-progress').length,
            completedAssignments: employeeAssignments.filter(a => a.status === 'completed').length,
            submittedAssignments: employeeAssignments.filter(a => a.status === 'submitted').length
        };
    }

    return stats;
};