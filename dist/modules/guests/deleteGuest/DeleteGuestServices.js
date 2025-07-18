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
exports.DeleteGuestServices = void 0;
const client_1 = require("../../../prisma/client");
class DeleteGuestServices {
    service(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idMatch, idGuest }) {
            if (!idMatch || !idGuest) {
                throw new Error("Necessita do id da partida e do convidado");
            }
            try {
                yield client_1.prisma.guest.delete({ where: { id: idGuest, idMatch: idMatch } });
                const resultMatch = yield client_1.prisma.match.update({ where: { id: idMatch }, data: { numberPlayers: { decrement: 1 } } });
                return resultMatch;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.DeleteGuestServices = DeleteGuestServices;
