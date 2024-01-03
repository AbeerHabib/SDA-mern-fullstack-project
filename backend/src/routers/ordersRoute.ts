import { Router } from 'express';

import { createOrderForUser, createOrderForVisitor, deleteOrderById, getAllOrdersForAdmin, getOrdersById, updatedOrderById } from '../controller/ordersController';
import { isAdmin, isLoggedIn, isVisitor } from '../middlewares/auth';

const router = Router();

router.get('/', isLoggedIn, isAdmin, getAllOrdersForAdmin);

router.post('/', isVisitor, createOrderForVisitor); // for visitor
router.post('/createOrder', isVisitor, isLoggedIn, createOrderForUser); // for user
router.get('/getOrder/:id([0-9a-fA-F]{24})', isLoggedIn, getOrdersById); // for user
router.put('/updateOrder/:id([0-9a-fA-F]{24})', isLoggedIn, updatedOrderById); // for user
router.delete('/:id([0-9a-fA-F]{24})', deleteOrderById); // for both

export default router;