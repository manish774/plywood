const mongoose = require('mongoose');

const specificationsSchema = new mongoose.Schema(
  {
    thickness: { type: String, trim: true, default: '' },
    size: { type: String, trim: true, default: '' },
    grade: { type: String, trim: true, default: '' },
    brand: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Item price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Item category is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    specifications: {
      type: specificationsSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

itemSchema.index({ category: 1 });

module.exports = mongoose.model('Item', itemSchema);
