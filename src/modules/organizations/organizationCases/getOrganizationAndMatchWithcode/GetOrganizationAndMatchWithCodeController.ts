import { Request, Response } from "express";
import { GetOrganizationAndMatchWithCodeServices } from "./GetOrganizationAndMatchWithCodeServices";


export class GetOrganizationAndMatchWithCodeController {

    async handle(req: Request, res: Response) {
        const {inviteCode} = req.params;

        const getOrganizationAndMatchWithCodeServices = new GetOrganizationAndMatchWithCodeServices();

        const result = await getOrganizationAndMatchWithCodeServices.services({inviteCode});

        return res.status(200).json(result);
    }

}