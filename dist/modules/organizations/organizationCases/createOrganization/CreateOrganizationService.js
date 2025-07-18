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
exports.CreateOrganizationService = void 0;
const client_1 = require("../../../../prisma/client");
class CreateOrganizationService {
    service(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, phoneNumber, nameUser, modality, uid }) {
            if (!name || !modality) {
                throw new Error('Não foi possível criar a organização. Verifique se "nome" e "modalidade" foram fornecidos.');
            }
            if (!email || !nameUser || !uid) {
                throw new Error("Necessita das informações do usuário.");
            }
            const existingUser = yield client_1.prisma.user.findFirst({ where: { email: email } });
            if (existingUser) {
                throw new Error('Já existe uma organização criada com esse e-mail.');
            }
            const newUser = yield client_1.prisma.user.create({
                data: {
                    email: email,
                    name: nameUser,
                    uid: uid,
                    phoneNumber: phoneNumber,
                },
            });
            console.log("Novo usuário criado:", newUser);
            if (newUser) {
                const createOrganization = yield client_1.prisma.organization.create({
                    data: {
                        modality,
                        name,
                        userId: newUser.id,
                    },
                });
                console.log("Organização criada:", createOrganization);
                const dataFormatted = Object.assign(Object.assign({}, createOrganization), { nameUser: newUser.name, email: newUser.email, phoneNumber: newUser.phoneNumber });
                return dataFormatted;
            }
            else {
                throw new Error('Não foi possível criar a organização porque o usuário não foi criado.');
            }
        });
    }
}
exports.CreateOrganizationService = CreateOrganizationService;
