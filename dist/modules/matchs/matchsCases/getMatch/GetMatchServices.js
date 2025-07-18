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
exports.GetMatchServices = void 0;
const client_1 = require("../../../../prisma/client");
class GetMatchServices {
    services(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idMatch, idOrganization }) {
            if (!idMatch || !idOrganization) {
                throw new Error("Necessita dos ids da partida e organização");
            }
            try {
                const result = yield client_1.prisma.match.findFirst({ where: { id: idMatch, idOrganization: idOrganization }, include: { guests: true } });
                if (!result) {
                    throw new Error("Não existe partida com esse id.");
                }
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.GetMatchServices = GetMatchServices;
