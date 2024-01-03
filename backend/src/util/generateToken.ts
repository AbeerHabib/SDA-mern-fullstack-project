import jwt from 'jsonwebtoken';

import { dev } from '../config';
import { UserInputType } from '../types/userType';

export const generateToken = (tokenPayload: UserInputType) => {
    return jwt.sign(tokenPayload, dev.app.jwtUserActivationKey, { expiresIn: '30m' });
};