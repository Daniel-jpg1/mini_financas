const categoryService = require('../services/categoryService');

module.exports = {

  async create(req, res) {
    try {
      const userId = req.user.id;
      const { name, description } = req.body;

      const category = await categoryService.create({ userId, name, description });

      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async index(req, res) {
    try {
      const userId = req.user.id;
      const categories = await categoryService.getAll(userId);

      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async show(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const category = await categoryService.findById({ userId, id });

      return res.json(category);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const updates = {};
      if (Object.prototype.hasOwnProperty.call(req.body, "name")) {
        updates.name = req.body.name;
    }
      if (Object.prototype.hasOwnProperty.call(req.body, "description")) {
        updates.description = req.body.description;
    }

      const updatedCategory = await categoryService.update(userId, id, updates);
      return res.json(updatedCategory);
  }   catch (err) {
      return res.status(400).json({ error: err.message });
  }
}
,

  async delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      await categoryService.delete( id, userId );

      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
};
