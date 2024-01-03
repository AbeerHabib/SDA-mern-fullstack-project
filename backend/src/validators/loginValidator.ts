import { check, ValidationChain } from 'express-validator';

export const loginValidation: ValidationChain[] = [
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
];