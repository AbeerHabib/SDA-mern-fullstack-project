import { check, ValidationChain } from 'express-validator';

export const productValidation: ValidationChain[] = [
    check('name')
    .trim()
    .notEmpty()
    .withMessage('* Product name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Product name should be at least 2-50 characters long'),
    check('description')
    .trim()
    .notEmpty()
    .withMessage('* Product description is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Product description should be at least 5-100 characters long'),
    check('price')
    .trim()
    .notEmpty()
    .withMessage('* Product price is required')
    .isFloat({ min: 1})
    .withMessage('Product price should be greater than or equal 1'),
    check('quantity')
    .trim()
    .notEmpty()
    .withMessage('* Product quantity is required')
    .isFloat({ min: 1})
    .withMessage('Product quantity should be greater than or equal 1'),
    check('sold')
    .optional()
    .trim()
    .isFloat({ min: 0})
    .withMessage('Sold should be a positive number'),
    check('shipping')
    .optional()
    .trim()
    .isFloat({ min: 0})
    .withMessage('Shipping should be a positive number'),
    check('category')
    .trim()
    .notEmpty()
    .withMessage('* Product categories are required')
    .isMongoId()
    .withMessage('Category Id is not correct'),
];

export const updateProductValidation: ValidationChain[] = [
    check('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('* Product name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('product name should be at least 2-50 characters long'),
    check('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('* Product description is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Product description should be at least 5-100 characters long'),
    check('price')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('* Product price is required')
    .isFloat({ min: 1})
    .withMessage('Product price should be greater than or equal 1'),
    check('quantity')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('* Product quantity is required')
    .isFloat({ min: 1})
    .withMessage('Product quantity should be greater than or equal 1'),
    check('sold')
    .optional()
    .trim()
    .isFloat({ min: 0})
    .withMessage('Sold should be a positive number'),
    check('shipping')
    .optional()
    .trim()
    .isFloat({ min: 0})
    .withMessage('Shipping should be a positive number'),
    check('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('* Product categories are required')
    .isMongoId()
    .withMessage('Category Id is not correct'),
];