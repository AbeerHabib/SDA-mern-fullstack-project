import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { dev } from '../config';
import { verifyUserData } from "../services/authService";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await verifyUserData(req);
        const accessToken = jwt.sign({ _id: user._id }, dev.app.jwtUserAccessKey, { expiresIn: '1h' });
        res.cookie(
            'access_token',
             accessToken,
             {
                maxAge: 60 * 60 * 1000, // 1 hour
                httpOnly: true,
                sameSite: 'strict'
            });
        res.status(200).send({ 
            message: 'You have successfully logged in!',
            payload:  user
        });
    } catch(error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('access_token');
        res.status(200).send({ 
            message: 'You have successfully logged out!',
        });
    } catch(error) {
        next(error);
    }
};