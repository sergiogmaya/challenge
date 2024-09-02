// src/types.d.ts
import 'express';

//Sobreescribimos el usuario al request de express
declare module 'express-serve-static-core' {
    interface Request {
        user?: { 
            id: string;
            username: string;
            email: string;
        }
    }
}
