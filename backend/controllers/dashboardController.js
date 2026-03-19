const dashboardService = require("../services/dashboardService");

module.exports = {
  async summary(req, res) {
    try {
      const dashboardData = await dashboardService.getSummary();

      return res.status(200).json(dashboardData);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
};
