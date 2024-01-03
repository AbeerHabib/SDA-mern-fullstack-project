import mongoose, { Schema } from 'mongoose';

import { UserType } from '../types/userType';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "user's first name must be at least 2 characters"],
    maxlength: [50, "user's first name must be at most 50 characters"]
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "user's last name must be at least 2 characters"],
    maxlength: [50, "user's last name must be at most 50 characters"]
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, "password must be at least 6 characters"],
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    trim: true,
    minlength: [3, "address must be at least 3 characters"],
    default: null
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  orders: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    }
  ],
  },
  { timestamps: true }
);

export default mongoose.model<UserType>('User', userSchema);