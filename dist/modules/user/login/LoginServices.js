"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginServices = exports.JWT_SECRET = void 0;
require("dotenv/config");
const client_1 = require("../../../prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_SECRET = process.env.SECRET || 'fallback_secret_for_dev';
;
class LoginServices {
    service(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, name, phoneNumber, uid }) {
            console.log("email", email);
            if (!email) {
                throw new Error("O e-mail é obrigatório para o login");
            }
            const existingUser = yield client_1.prisma.user.findFirst({ where: { email } });
            let tokenPayload;
            if (existingUser) {
                tokenPayload = {
                    email: existingUser.email,
                    name: existingUser.name,
                    phoneNumber: existingUser.phoneNumber,
                    id: existingUser.id,
                    uid: existingUser.uid
                };
            }
            else {
                tokenPayload = {
                    email,
                    name,
                    uid,
                    phoneNumber
                };
            }
            console.log("TokenPayload", tokenPayload);
            const token = jsonwebtoken_1.default.sign(tokenPayload, exports.JWT_SECRET, { expiresIn: "7d" });
            console.log("token", token);
            return token;
        });
    }
}
exports.LoginServices = LoginServices;
