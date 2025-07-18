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
exports.CreateOrganizationController = void 0;
const CreateOrganizationService_1 = require("./CreateOrganizationService");
class CreateOrganizationController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const { name, modality } = req.body;
            const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
            const nameUser = (_b = req.user) === null || _b === void 0 ? void 0 : _b.name;
            const phoneNumber = (_c = req.user) === null || _c === void 0 ? void 0 : _c.phoneNumber;
            const uid = (_d = req.user) === null || _d === void 0 ? void 0 : _d.uid;
            console.log("email", email);
            console.log("namUSer", nameUser);
            console.log("PhoneNumber", phoneNumber);
            console.log("Uid", uid);
            const organizationService = new CreateOrganizationService_1.CreateOrganizationService();
            const resultOrganization = yield organizationService.service({ name, nameUser, modality, email, phoneNumber, uid });
            return res.status(201).json(resultOrganization);
        });
    }
}
exports.CreateOrganizationController = CreateOrganizationController;
