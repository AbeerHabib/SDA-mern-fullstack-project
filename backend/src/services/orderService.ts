import { Request } from 'express';

import ApiError from '../errors/ApiError';
import { Order } from '../models/orderSchema';
import { IOrder, IOrderProduct } from '../types/orderType';

interface CustomRequest extends Request {
  userId?: string;
}

export const getAllOrders = async () => {
  const orders = await Order.find().populate({
    path: 'products',
    populate: {
      path: 'product',
      select: 'name image price' },
    }).populate('user', 'firstName lastName email phone address');
  return orders;
};

export const createNewOrderForVisitor = async (req: CustomRequest) => {
  const { products } = req.body;
  const userId = req.userId;
  
  if (products.length > 0) {
    const selectedProducts = products.map((item: IOrderProduct) => ({
      product: item.product,
      quantity: item.quantity
    }));
    const newOrder: IOrder = new Order({
      products: selectedProducts,
      visitor: userId
    });
    await newOrder.save();
    return newOrder;
  }
};

export const createNewOrderForUser = async (req: CustomRequest) => {
  const { products /*, payment*/ } = req.body;
  const userId = req.userId;
  
  if (products.length > 0) {
    const selectedProducts = products.map((item: IOrderProduct) => ({
      product: item.product,
      quantity: item.quantity
    }));
    const newOrder: IOrder = new Order({
      products: selectedProducts,
      // payment: payment,
      user: userId
    });
    await newOrder.save();
    return newOrder;
  }
};

export const getOrders = async (req: CustomRequest) => {
  const userId = req.userId;
  const userOrders = await Order.find({ user: userId }).populate({
    path: 'products',
    populate: {
      path: 'product',
      select: 'name image price' },
    }).populate('user', 'firstName lastName email phone address');
  return userOrders;
};


export const updateUserOrder = async (req: Request) => {
  const orderId = req.params.id;
  const orderData = req.body;
  const updatedOrder = await Order.findOneAndUpdate({ _id: orderId }, orderData, { new: true });
  if(!updatedOrder) {
    throw new ApiError(404, 'Order is not found');
  }
  return updatedOrder;
};

export const deleteOrder = async (req: Request) => {
  const id = req.params.id;
  const order = await Order.findOneAndDelete({ _id: id });
  if(!order) {
  throw new ApiError(404, "Order is not found");
  }
};