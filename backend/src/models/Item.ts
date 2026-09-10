import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISpecifications {
  thickness: string;
  size: string;
  grade: string;
  brand: string;
}

const specificationsSchema = new Schema<ISpecifications>(
  {
    thickness: { type: String, trim: true, default: '' },
    size: { type: String, trim: true, default: '' },
    grade: { type: String, trim: true, default: '' },
    brand: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

export interface IItem extends Document {
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  images: string[];
  specifications: ISpecifications;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema<IItem>(
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
      type: Schema.Types.ObjectId,
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

export default mongoose.model<IItem>('Item', itemSchema);
