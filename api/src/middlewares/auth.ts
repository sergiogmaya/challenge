import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email
    };
    next();
};
