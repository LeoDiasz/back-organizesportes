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
exports.UpdateConfirmGuestServices = void 0;
const client_1 = require("../../../prisma/client");
class UpdateConfirmGuestServices {
    services(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idMatch, idGuest, confirmNow }) {
            if (!idMatch || !idGuest) {
                throw new Error("Necessita do id do convidado e da partida");
            }
            try {
                const result = yield client_1.prisma.guest.update({ where: { idMatch, id: idGuest }, data: { isConfirm: !confirmNow } });
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.UpdateConfirmGuestServices = UpdateConfirmGuestServices;
