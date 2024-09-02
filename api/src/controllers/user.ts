import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../services/auth';

//Funcion de registro de usuario
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email }); //Validamos que el usuario no exista anteriormente
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({ username, email, password });
        await user.save();

        //Guardamos el usuario y generamos el token
        const token = generateToken(user);

        //Devolvemos el token al frontend
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering user', error });
    }
};

//Funcion de login del usuario
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }); //Comprobamos que el email corresponda con algun usuario
        if (!user || !(await user.comparePassword(password))) { //Comparamos la contraseña mediante bcrypt
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        //Generamos y devolvemos el token
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error });
    }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.findById(req.user!.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user, req.user)

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching user', error });
    }
};
