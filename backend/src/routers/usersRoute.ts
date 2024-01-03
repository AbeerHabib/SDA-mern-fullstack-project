import { Router } from 'express';

import { activateUserAccount, banUser, deleteUserById, forgetPassword, getAllUsers, getUserById, grantRole, register, resetPassword, updateUserById } from '../controller/usersController';
import { isAdmin, isLoggedIn, isLoggedOut } from '../middlewares/auth';
import { forgetPasswordValidation, resetPasswordValidation } from '../validators/forgetResetPasswordValidator';
import { runValidation } from '../validators/index';
import { updateUserValidation, userValidation } from '../validators/userValidator';

const router = Router();

router.get('/', isLoggedIn, isAdmin, getAllUsers);
router.get('/:id', isLoggedIn, getUserById);
router.post('/register', isLoggedOut, userValidation, runValidation, register);
router.post('/activate-account', isLoggedOut, activateUserAccount);
router.post('/forget-password', isLoggedOut, forgetPasswordValidation, runValidation, forgetPassword);
router.put('/reset-password', isLoggedOut, resetPasswordValidation, runValidation, resetPassword);
router.put('/:id', isLoggedIn, updateUserValidation, runValidation, updateUserById);
router.delete('/:id', isLoggedIn, isAdmin, deleteUserById);
router.put('/ban/:id', isLoggedIn, isAdmin, banUser);
router.put('/grantRole/:id', isLoggedIn, isAdmin, grantRole);

export default router;