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
exports.CreateGuestServices = void 0;
const client_1 = require("../../../prisma/client");
class CreateGuestServices {
    service(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, phoneNumber, preferencePosition, matchId, idOrganization }) {
            if (!email) {
                throw new Error("Necessita de e-mail para se cadastrar.");
            }
            if (!matchId) {
                throw new Error("Necessita do id da partida.");
            }
            try {
                const existsGuestInMatch = yield client_1.prisma.guest.findFirst({ where: { email, idMatch: matchId, match: { idOrganization } } });
                console.log("exists", existsGuestInMatch);
                if (existsGuestInMatch) {
                    throw new Error("Este email/jogador já esta registrado na partida.");
                }
                const existsMatch = yield client_1.prisma.match.findFirst({ where: { id: matchId, idOrganization } });
                if (!existsMatch) {
                    throw new Error("Não existe essa partida.");
                }
                if (existsMatch.status !== "Agendada") {
                    throw new Error(`Não é possivel se cadastrar. A partida esta ${existsMatch.status}`);
                }
                if (existsMatch.numberPlayers >= existsMatch.numberMaxPlayers) {
                    return new Error("A partida já atingiu o numero máximo de jogadores");
                }
                const result = yield client_1.prisma.guest.create({ data: { name, email, phoneNumber, preferencePosition, idMatch: matchId } });
                if (result) {
                    yield client_1.prisma.match.update({ where: { id: matchId }, data: { numberPlayers: { increment: 1 } } });
                }
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.CreateGuestServices = CreateGuestServices;
