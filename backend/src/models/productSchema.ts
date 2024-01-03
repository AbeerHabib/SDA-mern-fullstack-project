import mongoose from 'mongoose';

import { IProduct } from '../types/productType';

const productSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters long'],
    maxlength: [50, 'Product name must be at most 50 characters long']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  image: {
    type: String,
    default: 'public/images/default.png',
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, 'Product description must be at least 5 characters long'],
    maxlength: [100, 'Product description must be at most 100 characters long']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative'],
  },
  sold: {
    type: Number,
    default: 0,
    min: [0, 'Sold count cannot be negative'],
  },
  shipping: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);