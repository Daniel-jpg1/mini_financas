const { Category } = require('../models');

module.exports = {

    async create({ userId, name, description }) {
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
      name,
      description
    });

    return category;
  },

  async getAll(userId) {
    return await Category.findAll({
      where: { user_id: userId },
      order: [['name', 'ASC']]
    });
  },

async update(userId, id, updates) {
  const category = await Category.findOne({ where: { user_id: userId, id } });
  if (!category) throw new Error("Categoria não encontrada");

  const clean = {};

  if (Object.prototype.hasOwnProperty.call(updates, "name")) {
    clean.name = (updates.name ?? "").trim();
    if (!clean.name) throw new Error("Nome da categoria é obrigatório");

    const duplicated = await Category.findOne({
      where: { user_id: userId, name: clean.name }
    });

    if (duplicated && duplicated.id !== category.id) {
      throw new Error("Você já possui uma categoria com esse nome");
    }
  }

  if (Object.prototype.hasOwnProperty.call(updates, "description")) {
    clean.description = (updates.description ?? "").trim();
    if (!clean.description) throw new Error("Descrição é obrigatória");
  }

  await category.update(clean);
  return category;
}
,

  async delete(id, userId) {
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
