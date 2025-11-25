const { User } = require('../models');

module.exports = {

  async getProfile(userId) {
    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'email', 'createdAt']
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

};
