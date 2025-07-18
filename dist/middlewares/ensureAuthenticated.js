"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
exports.ensureAuthenticated = ensureAuthenticated;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
exports.JWT_SECRET = process.env.SECRET || 'fallback_secret_for_dev';
function ensureAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }
    const [, token] = authToken.split(' ');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, exports.JWT_SECRET);
        const { email, id, uid, name, phoneNumber } = decoded;
        req.user = { email, id, uid, name, phoneNumber };
        return next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expirado.' });
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token inválido.' });
        }
        return res.status(500).json({ message: 'Erro de autenticação desconhecido.' });
    }
}
