import { Request, Response } from "express";
import { CreateOrganizationService } from "./CreateOrganizationService";


export class CreateOrganizationController {

    async handle(req: Request, res: Response) {
        const {name, nameUser, modality, email, phoneNumber, uid} = req.body;

        const organizationService = new CreateOrganizationService();

        const resultOrganization = organizationService.service({name, nameUser, modality, email, phoneNumber, uid});

        return res.status(201).json(resultOrganization);
    }
}