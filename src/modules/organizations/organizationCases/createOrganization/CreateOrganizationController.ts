import { Request, Response } from "express";
import { CreateOrganizationService } from "./CreateOrganizationService";


export class CreateOrganizationController {

    async handle(req: Request, res: Response) {
        const {name, modality} = req.body;
        const email = req.user?.email;
        const nameUser = req.user?.name;
        const phoneNumber = req.user?.phoneNumber;
        const uid = req.user?.uid


        console.log("email", email)
        console.log("namUSer", nameUser);
        console.log("PhoneNumber", phoneNumber);
        console.log("Uid", uid)
        const organizationService = new CreateOrganizationService();

        const resultOrganization = await organizationService.service({name, nameUser, modality, email, phoneNumber, uid});

        return res.status(201).json(resultOrganization);
    }
}