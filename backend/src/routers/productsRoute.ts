import { Router } from 'express';

import { createSingleProduct, deleteSingleProductById, getAllProducts, getFilteredProducts, getSingleProductById, updateSingleProductById } from '../controller/productsController';
import { isAdmin, isLoggedIn } from '../middlewares/auth';
import { upload } from '../middlewares/uploadFiles';
import { runValidation } from '../validators/index';
import { productValidation, updateProductValidation } from '../validators/productValidator';

const router = Router();

router.get('/', getAllProducts);
router.get('/filtered-products', getFilteredProducts);
router.get('/:id', getSingleProductById);
router.post('/', isLoggedIn, isAdmin, upload.single('image'), productValidation, runValidation, createSingleProduct);
router.put('/:id([0-9a-fA-F]{24})', isLoggedIn, isAdmin, upload.single('image'), updateProductValidation, runValidation, updateSingleProductById);
router.delete('/:id', isLoggedIn, isAdmin, deleteSingleProductById);

export default router;