import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { dev } from '../config';
import ApiError from '../errors/ApiError';
import User from '../models/userSchema';

interface CustomRequest extends Request {
    userId?: string;
}

export const isLoggedIn = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
            throw new ApiError(401, "You are not logged in");
        }
        const decodedAccessToken = jwt.verify(accessToken, dev.app.jwtUserAccessKey) as JwtPayload;
        if (!decodedAccessToken) {
            throw new ApiError(401, "Invalid access token");
        }
        req.userId = decodedAccessToken._id;
        next();
    } catch(error) {
        next(error);
    }
};

export const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.access_token;
        if (accessToken) {
            throw new ApiError(401, "You are already logged in");
        }
        next();
    } catch(error) {
        next(error);
    }
};

export const isAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.userId);
        if (!user?.isAdmin) {
            throw new ApiError(403, "You are not authorized to access this route");
        }
        next();
    } catch(error) {
        next(error);
    }
};

export const isVisitor = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
            req.userId = uuidv4()
        }
        next();
    } catch(error) {
        next(error);
    }
};