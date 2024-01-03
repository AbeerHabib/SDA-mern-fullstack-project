import { Request } from "express";
import bcrypt from 'bcrypt';

import ApiError from "../errors/ApiError";
import User from "../models/userSchema";

export const verifyUserData = async (req: Request) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if(!user) {
        throw new ApiError(404, "Invalid email");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
        throw new ApiError(401, "Invalid password");
    }
    if(user.isBanned) {
        throw new ApiError(403, "Unfortunately, your account is banned. please contact technical support for more information");
    }
    return user;
};