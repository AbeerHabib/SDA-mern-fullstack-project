import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';

import { dev } from "../config";
import ApiError from "../errors/ApiError";
import { handleSendEmail } from "../helper/sendEmail";
import User from "../models/userSchema";
import { findAllUsers, findSingleUser, isTokenExist, isUserExist, removeUser, updateBanStatus, updateSingleUser, updateUserRole } from "../services/userService";
import { EmailDataType } from "../types/userType";
import { accountActivationEmailTemplate } from '../util/accountActivationEmailTemplate';
import { resetPasswordRequestEmailTemplate } from '../util/resetPasswordRequestEmailTemplate';
import { verifyToken } from "../util/verifyToken";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await findAllUsers();
        res.status(200).send({ 
            message: 'All users are returned',
            payload:  users
        });
    } catch(error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await findSingleUser(id);
        res.status(200).send({ 
            message: 'User data is returned',
            payload:  user
        });
    } catch(error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { email } = req.body;
        await isUserExist(email);
        const emailTemplate = await accountActivationEmailTemplate(req);
        const emailDetails: EmailDataType = {
            email: email,
            subject: 'Activate Your Account',
            html: emailTemplate
        };
        await handleSendEmail(emailDetails);
        res.status(200).send({ 
            message: 'Check your email to activate your account',
            // token: token
        });
    } catch(error) {
        next(error);
    }
};

export const activateUserAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.body.token;
        await isTokenExist(token);
        const verifiedToken = verifyToken(token);
        await User.create(verifiedToken);        
        res.status(201).send({message: 'User account created successfully! You can now log in to your account'});   
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            const tokenExpiredError = new ApiError(401, 'Token has expired, try to sign up again');
            next(tokenExpiredError);
        }
        else if (error instanceof JsonWebTokenError) {
            const tokenInvalidError =  new ApiError(401, 'Invalid token');
            next(tokenInvalidError);
        }
        else {
            next(error);
        }
    }
};

export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const emailTemplate = await resetPasswordRequestEmailTemplate(req);
        const token = jwt.sign({ email }, dev.app.jwtUserResetPasswordKey, { expiresIn: '30m' });
        const emailDetails: EmailDataType = {
            email: email,
            subject: 'Password Change Request',
            html: emailTemplate
        };
        await handleSendEmail(emailDetails);
        res.status(200).send({ 
            message: 'Check your email to reset password',
            // token: token
        });
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token, password } = req.body;
        await isTokenExist(token);
        const verifiedToken = jwt.verify(token, dev.app.jwtUserResetPasswordKey) as JwtPayload;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOneAndUpdate({ email: verifiedToken.email }, { $set: { password: hashedPassword } }, { new: true, projection: { password: 0 } });
        res.status(200).send({
            message: 'User password updated successfully!',
            payload: user
        });
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            const tokenExpiredError = new ApiError(401, 'Token has expired. Please try making another request');
            next(tokenExpiredError);
        }
        else if (error instanceof JsonWebTokenError) {
            const tokenInvalidError =  new ApiError(401, 'Invalid token');
            next(tokenInvalidError);
        }
        else {
            next(error);
        }
    }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await updateSingleUser(req);
        res.status(200).send({
            message: 'User data updated successfully!',
            payload: user
        });
    } catch(error) {
        next(error);
    }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await removeUser(id);
        res.status(204).json();
    } catch(error) {
        next(error);
    }
};

export const banUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const isBanned = req.body.isBanned;
        const user = await updateBanStatus(id, isBanned);
        if (user.isBanned) {
            res.status(200).send({
                message: 'The user has been successfully banned!',
                payload: user
            });
        }
        else {
            res.status(200).send({
                message: 'The user has been successfully unbanned!',
                payload: user
            });
        }
    } catch(error) {
        next(error);
    }
};

export const grantRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const isAdmin = req.body.isAdmin;
        const user = await updateUserRole(id, isAdmin);
        if (user.isAdmin) {
            res.status(200).send({
                message: "The user's role has been successfully switched to Admin!",
                payload: user
            });
        }
        else {
            res.status(200).send({
                message: "The user's role has been successfully switched to User!",
                payload: user
            });
        }
    } catch(error) {
        next(error);
    }
};