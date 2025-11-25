const authService = require('../services/authService');

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const user = await authService.register({ name, email, password });

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const token = await authService.login({ email, password });

      return res.json({ token });
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }
};
