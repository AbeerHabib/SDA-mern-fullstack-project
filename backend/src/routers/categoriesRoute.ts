import { Router } from 'express';

import { createCategory, deleteCategoryBySlug, getAllCategories, getSingleCategoryBySlug, updateCategoryBySlug } from '../controller/categoriesController';
import { isAdmin, isLoggedIn } from '../middlewares/auth';
import { categoryValidations, updateCategoryValidations } from '../validators/categoryValidator';
import { runValidation } from '../validators/index';

const router = Router();

router.get('/', getAllCategories);
router.get('/:slug', isLoggedIn, isAdmin, getSingleCategoryBySlug);
router.post('/', isLoggedIn, isAdmin, categoryValidations, runValidation, createCategory);
router.put('/:slug', isLoggedIn, isAdmin, updateCategoryValidations, runValidation, updateCategoryBySlug);
router.delete('/:slug', isLoggedIn, isAdmin, deleteCategoryBySlug);

export default router;