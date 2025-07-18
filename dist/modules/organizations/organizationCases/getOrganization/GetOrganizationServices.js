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
exports.GetOrganizationServices = void 0;
const client_1 = require("../../../../prisma/client");
class GetOrganizationServices {
    service(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            console.log("Email", email);
            if (!email) {
                throw new Error("Não foi possivel realizar a busca.");
            }
            try {
                const organization = yield client_1.prisma.organization.findFirst({ where: { user: { email } } });
                if (!organization) {
                    throw new Error("Não existe organização criada com esse e-mail.");
                }
                return organization;
            }
            catch (err) {
                console.log("err", err);
                throw new Error(err);
            }
        });
    }
}
exports.GetOrganizationServices = GetOrganizationServices;
