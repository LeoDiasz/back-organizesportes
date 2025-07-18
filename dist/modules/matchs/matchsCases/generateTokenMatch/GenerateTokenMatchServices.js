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
exports.GenerateTokenMatchServices = void 0;
const crypto_1 = __importDefault(require("crypto"));
const client_1 = require("../../../../prisma/client");
const generateShortCode = (length = 8) => {
    return crypto_1.default.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};
const generateUniqueInviteCode = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (retries = 5) {
    let code;
    let attempts = 0;
    let isUnique = false;
    while (!isUnique && attempts < retries) {
        code = generateShortCode();
        const isExistingMatch = yield client_1.prisma.match.findFirst({ where: { inviteCode: code }, select: { id: true } });
        if (!isExistingMatch) {
            isUnique = true;
        }
        else {
            attempts++;
        }
    }
    return code;
});
class GenerateTokenMatchServices {
    services(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idOrganization, idMatch }) {
            if (!idOrganization || !idMatch) {
                throw new Error("Necessita do id da organização e da partida.");
            }
            try {
                const newInviteCode = yield generateUniqueInviteCode();
                const match = yield client_1.prisma.match.findFirst({ where: { id: idMatch, idOrganization } });
                if (!match) {
                    throw new Error("Não existe partida cadastrada.");
                }
                const result = yield client_1.prisma.match.update({ where: { id: idMatch, idOrganization }, data: { inviteCode: newInviteCode }, select: { inviteCode: true } });
                return result;
            }
            catch (err) {
                throw new Error("Não foi possivel gerar o código da partida.");
            }
        });
    }
}
exports.GenerateTokenMatchServices = GenerateTokenMatchServices;
