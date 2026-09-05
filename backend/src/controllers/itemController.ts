import mongoose from 'mongoose';
import type { Request, Response } from 'express';
import type { FilterQuery } from 'mongoose';
import Item, { IItem, ISpecifications } from '../models/Item';
import Category from '../models/Category';

interface ItemBody {
  name?: string;
  description?: string;
  price?: number | string;
  category?: string;
  images?: string[];
  specifications?: Partial<ISpecifications>;
}

interface ListItemsQuery {
  category?: string;
}

async function listItems(req: Request<unknown, unknown, unknown, ListItemsQuery>, res: Response): Promise<void> {
  const { category } = req.query;
  const filter: FilterQuery<IItem> = {};

  if (category) {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      res.status(400).json({ error: 'Invalid category id' });
      return;
    }
    filter.category = category;
  }

  const items = await Item.find(filter).populate('category').sort({ createdAt: -1 });
  res.json(items);
}

async function getItem(req: Request<{ id: string }>, res: Response): Promise<void> {
  const item = await Item.findById(req.params.id).populate('category');
  if (!item) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }
  res.json(item);
}

async function createItem(req: Request<unknown, unknown, ItemBody>, res: Response): Promise<void> {
  const { name, description, price, category, images, specifications } = req.body;

  if (!name || !name.trim()) {
    res.status(400).json({ error: 'name is required' });
    return;
  }
  if (price === undefined || price === null || Number.isNaN(Number(price))) {
    res.status(400).json({ error: 'price is required and must be a number' });
    return;
  }
  if (!category || !mongoose.Types.ObjectId.isValid(category)) {
    res.status(400).json({ error: 'A valid category id is required' });
    return;
  }

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    res.status(400).json({ error: 'category does not reference an existing Category' });
    return;
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

async function updateItem(req: Request<{ id: string }, unknown, ItemBody>, res: Response): Promise<void> {
  const { name, description, price, category, images, specifications } = req.body;

  if (name !== undefined && !name.trim()) {
    res.status(400).json({ error: 'name cannot be empty' });
    return;
  }
  if (price !== undefined && Number.isNaN(Number(price))) {
    res.status(400).json({ error: 'price must be a number' });
    return;
  }
  if (category !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      res.status(400).json({ error: 'Invalid category id' });
      return;
    }
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      res.status(400).json({ error: 'category does not reference an existing Category' });
      return;
    }
  }

  const item = await Item.findByIdAndUpdate(
    req.params.id,
    { name, description, price, category, images, specifications },
    { new: true, runValidators: true, omitUndefined: true }
  ).populate('category');

  if (!item) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }
  res.json(item);
}

async function deleteItem(req: Request<{ id: string }>, res: Response): Promise<void> {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }
  res.json({ message: 'Item deleted', id: req.params.id });
}

export {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
