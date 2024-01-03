import { Schema, model } from 'mongoose';

import { IOrder } from '../types/orderType';

const orderSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        trim: true
      },
    },
  ],
  user: { //
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  visitor: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      "Not processed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ],
    default: "Not processed"
  },
  // payment: { type: Object, required: true }
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', orderSchema);