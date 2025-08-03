import * as dashboardService from '../services/dashboard.service.js';

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats(req.user);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};