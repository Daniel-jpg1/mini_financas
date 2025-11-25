const userService = require('../services/userService');

module.exports = {
  async me(req, res) {
    try {
      const userId = req.user.id; // vem do middleware de autenticação

      const user = await userService.getProfile(userId);

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
