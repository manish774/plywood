const Category = require('../models/Category');

async function listCategories(req, res) {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
}

async function getCategory(req, res) {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(category);
}

async function createCategory(req, res) {
  const { name, description, image } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }

  const category = await Category.create({ name, description, image });
  res.status(201).json(category);
}

async function updateCategory(req, res) {
  const { name, description, image } = req.body;

  if (name !== undefined && !name.trim()) {
    return res.status(400).json({ error: 'name cannot be empty' });
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, description, image },
    { new: true, runValidators: true, omitUndefined: true }
  );

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(category);
}

async function deleteCategory(req, res) {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json({ message: 'Category deleted', id: req.params.id });
}

module.exports = {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
