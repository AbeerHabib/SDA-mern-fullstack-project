import { NextFunction, Request, Response } from 'express';

import { createNewOrderForUser, createNewOrderForVisitor, deleteOrder, getAllOrders, getOrders, updateUserOrder } from '../services/orderService';

export const getAllOrdersForAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await getAllOrders();
    res.status(200).send({
      message: 'All orders are returned',
      payload: orders
    });
  } catch (error) {
    next(error);
  }
};

export const createOrderForVisitor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newOrder = await createNewOrderForVisitor(req);
    res.status(200).send({ 
      message: 'Order created successfully!',
      payload: newOrder
    });
  } catch (error) {
    next(error);
  }
};

export const createOrderForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newOrder = await createNewOrderForUser(req);
    res.status(200).send({ 
      message: 'Order created successfully!',
      payload: newOrder
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userOrders = await getOrders(req);
    res.status(200).send({ 
      message: 'Order data is returned',
      payload: userOrders
    });
  } catch (error) {
    next(error);
  }
};

export const updatedOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedOrder = await updateUserOrder(req);
    res.status(200).send({
      message: 'Order updated successfully!',
      payload: updatedOrder
    });
  } catch (error) {
    next(error);
    }
};

export const deleteOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteOrder(req);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};