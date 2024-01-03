import { check, ValidationChain } from 'express-validator';

export const categoryValidations: ValidationChain[] = [
    check('name')
    .trim()
    .notEmpty()
    .withMessage('* Category name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name should be at least 2-50 characters long'),
];

export const updateCategoryValidations: ValidationChain[] = [
    check('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('* Category name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name should be at least 2-50 characters long'),
];