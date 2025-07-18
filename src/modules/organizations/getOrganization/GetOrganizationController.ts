import { Request, Response } from "express";
import { GetOrganizationServices } from "./GetOrganizationServices";

export class GetOrganizationController {

    async handle(req: Request, res: Response) {
        const email = req.user?.email || "";
    
        const getOrganizationServices = new GetOrganizationServices();

        const response = await getOrganizationServices.service({email});

        res.status(200).json(response);
    
    }
}