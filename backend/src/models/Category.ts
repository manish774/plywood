import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  image: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String, // URL to the category image
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>('Category', categorySchema);
