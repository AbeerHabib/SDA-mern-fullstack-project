import jwt, { JwtPayload } from 'jsonwebtoken';

import { dev } from '../config';

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, dev.app.jwtUserActivationKey) as JwtPayload;
};