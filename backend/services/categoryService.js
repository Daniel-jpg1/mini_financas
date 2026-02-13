const { Category } = require('../models');

module.exports = {

    async create({ userId, name }) {
  if (typeof name !== "string" || !name.trim()) {
    throw new Error("Nome da categoria é obrigatório");
  }

  const cleanName = name.trim();

    const exists = await Category.findOne({
      where: { user_id: userId, name }
    });

    if (exists) {
      throw new Error("Você já possui uma categoria com esse nome");
    }

    const category = await Category.create({
      user_id: userId,
      name
    });

    return category;
  },

  async getAll(userId) {
    return await Category.findAll({
      where: { user_id: userId },
      order: [['name', 'ASC']]
    });
  },

  async update(id, userId, updates) {
    const category = await Category.findOne({
      where: { id, user_id: userId }
    });

    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    if (updates.name) {
      const duplicated = await Category.findOne({
        where: {
          user_id: userId,
          name: updates.name
        }
      });

      if (duplicated && duplicated.id !== category.id) {
        throw new Error("Você já possui uma categoria com esse nome");
      }
    }

    await category.update(updates);

    return category;
  },

  async remove(id, userId) {
    const category = await Category.findOne({
      where: { id, user_id: userId }
    });

    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    await category.destroy();

    return true;
  }
};
