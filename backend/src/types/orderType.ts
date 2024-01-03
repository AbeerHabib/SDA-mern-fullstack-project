import { Document } from 'mongoose';

import { IUser } from './userType';
import { ProductType } from './productType';
export interface IOrder extends Document {
  products: IOrderProduct[];
  user?: IUser['_id']; //
  visitor?: string;
  status:
  "Not processed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled" ;
  //payment: IorderPayment;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IOrderProduct{
  product: ProductType['_id'];
  quantity: number;
}

// interface IorderPayment{}