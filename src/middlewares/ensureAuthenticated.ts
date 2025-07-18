import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const JWT_SECRET = process.env.SECRET || 'fallback_secret_for_dev';

interface ITokenPayload {
    email: string;
    name: string;
    uid: string;
    phoneNumber?: string;
    id?: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                name: string;
                phoneNumber?: string;
                uid: string;
                id?: string;
            };
        }
    }
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const [, token] = authToken.split(' ');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const { email, id, uid, name, phoneNumber } = decoded as ITokenPayload;
        req.user = { email, id, uid, name, phoneNumber };

        return next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expirado.' });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token inválido.' });
        }
        return res.status(500).json({ message: 'Erro de autenticação desconhecido.' });
    }
}




