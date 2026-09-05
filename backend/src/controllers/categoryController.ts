import type { Request, Response } from 'express';
import Category from '../models/Category';

interface CategoryBody {
  name?: string;
  description?: string;
  image?: string;
}

async function listCategories(req: Request, res: Response): Promise<void> {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
}

async function getCategory(req: Request<{ id: string }>, res: Response): Promise<void> {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }
  res.json(category);
}

async function createCategory(req: Request<unknown, unknown, CategoryBody>, res: Response): Promise<void> {
  const { name, description, image } = req.body;

  if (!name || !name.trim()) {
    res.status(400).json({ error: 'name is required' });
    return;
  }

  const category = await Category.create({ name, description, image });
  res.status(201).json(category);
}

async function updateCategory(
  req: Request<{ id: string }, unknown, CategoryBody>,
  res: Response
): Promise<void> {
  const { name, description, image } = req.body;

  if (name !== undefined && !name.trim()) {
    res.status(400).json({ error: 'name cannot be empty' });
    return;
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, description, image },
    { new: true, runValidators: true, omitUndefined: true }
  );

  if (!category) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }
  res.json(category);
}

async function deleteCategory(req: Request<{ id: string }>, res: Response): Promise<void> {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }
  res.json({ message: 'Category deleted', id: req.params.id });
}

export {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
