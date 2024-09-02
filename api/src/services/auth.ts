import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const secretKey = process.env.SECRET || 'your_secret_key';

//Funcion para generar el token que mandamos al frontend
export const generateToken = (user: IUser): string => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        secretKey,
        { expiresIn: '48h' }
    );
};

//Funcion para verificar el token que nos manda el frontend
export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};
