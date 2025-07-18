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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrganizationAndMatchWithCodeServices = void 0;
const client_1 = require("../../../../prisma/client");
class GetOrganizationAndMatchWithCodeServices {
    services(_a) {
        return __awaiter(this, arguments, void 0, function* ({ inviteCode }) {
            if (!inviteCode) {
                throw new Error("Necessita do código");
            }
            try {
                const match = yield client_1.prisma.match.findFirst({ where: { inviteCode }, include: { organization: true } });
                if (!match) {
                    throw new Error("Não existe partida com esse código");
                }
                if (match.status !== "Agendada") {
                    throw new Error(`Não é possivel se cadastrar. A partida esta ${match.status}`);
                }
                if (match.numberPlayers >= match.numberMaxPlayers) {
                    throw new Error("A partida já atingiu o numero máximo de jogadores");
                }
                return match;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.GetOrganizationAndMatchWithCodeServices = GetOrganizationAndMatchWithCodeServices;
