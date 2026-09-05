import mongoose, { Document, Schema, Types } from 'mongoose';

export type ContactStatus = 'pending' | 'acknowledged';

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  itemName: string;
  item: Types.ObjectId | null;
  user: Types.ObjectId | null;
  status: ContactStatus;
  adminReply: string;
  repliedAt: Date | null;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    itemName: {
      type: String,
      trim: true,
      default: '',
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'acknowledged'],
      default: 'pending',
    },
    adminReply: {
      type: String,
      trim: true,
      default: '',
    },
    repliedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model<IContact>('Contact', contactSchema);
