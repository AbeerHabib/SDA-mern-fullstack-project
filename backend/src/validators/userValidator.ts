import { check, ValidationChain } from 'express-validator';

export const userValidation: ValidationChain[] = [
    check('firstName')
    .trim()
    .notEmpty()
    .withMessage('* First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name should be at least 2-50 characters long')
    .matches(/^[a-zA-Z]+$/)
    .withMessage('First name cannot contain symbols or numbers'),
    check('lastName')
    .trim()
    .notEmpty()
    .withMessage('* Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name should be at least 2-50 characters long')
    .matches(/^[a-zA-Z]+$/)
    .withMessage('Last name cannot contain symbols or numbers'),
    check('email')
    .trim()
    .notEmpty()
    .withMessage('* Email is required')
    .isEmail()
    .withMessage('Email address is not correct'),
    check('password')
    .trim()
    .notEmpty()
    .withMessage('* Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more')
    .matches(/[^a-zA-Z0-9]/)
    .withMessage('Password must contains at least one symbol, one number, and one letter'),
    check('phone')
    .trim()
    .notEmpty()
    .withMessage('* Phone number is required'),
    check('address')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Address must be at least 3 characters'),
];

export const updateUserValidation: ValidationChain[] = [
    check('firstName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('* First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name should be at least 2-50 characters long')
    .matches(/^[a-zA-Z]+$/)
    .withMessage('First name cannot contain symbols or numbers'),
    check('lastName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('* Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name should be at least 2-50 characters long')
    .matches(/^[a-zA-Z]+$/)
    .withMessage('Last name cannot contain symbols or numbers'),
    check('email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('* Email is required')
    .isEmail()
    .withMessage('Email address is not correct'),
    check('password')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('* Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more')
    .matches(/[^a-zA-Z0-9]/)
    .withMessage('Password must contains at least one symbol, one number, and one letter'),
    check('phone')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('* Phone number is required'),
    check('address')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Address must be at least 3 characters'),
];