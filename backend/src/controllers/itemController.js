const mongoose = require('mongoose');
const Item = require('../models/Item');
const Category = require('../models/Category');

async function listItems(req, res) {
  const { category } = req.query;
  const filter = {};

  if (category) {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }
    filter.category = category;
  }

  const items = await Item.find(filter).populate('category').sort({ createdAt: -1 });
  res.json(items);
}

async function getItem(req, res) {
  const item = await Item.findById(req.params.id).populate('category');
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
}

async function createItem(req, res) {
  const { name, description, price, category, images, specifications } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }
  if (price === undefined || price === null || Number.isNaN(Number(price))) {
    return res.status(400).json({ error: 'price is required and must be a number' });
  }
  if (!category || !mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).json({ error: 'A valid category id is required' });
  }

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return res.status(400).json({ error: 'category does not reference an existing Category' });
  }

  const item = await Item.create({
    name,
    description,
    price,
    category,
    images,
    specifications,
  });

  const populated = await item.populate('category');
  res.status(201).json(populated);
}

async function updateItem(req, res) {
  const { name, description, price, category, images, specifications } = req.body;

  if (name !== undefined && !name.trim()) {
    return res.status(400).json({ error: 'name cannot be empty' });
  }
  if (price !== undefined && Number.isNaN(Number(price))) {
    return res.status(400).json({ error: 'price must be a number' });
  }
  if (category !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: 'category does not reference an existing Category' });
    }
  }

  const item = await Item.findByIdAndUpdate(
    req.params.id,
    { name, description, price, category, images, specifications },
    { new: true, runValidators: true, omitUndefined: true }
  ).populate('category');

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
}

async function deleteItem(req, res) {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json({ message: 'Item deleted', id: req.params.id });
}

module.exports = {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
