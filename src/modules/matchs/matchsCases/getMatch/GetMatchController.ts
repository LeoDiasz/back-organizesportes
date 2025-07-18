import { Request, Response } from "express";
import { GetMatchServices } from "./GetMatchServices";


export class GetMatchController {

    async handle(req: Request, res: Response) {
        const {idMatch, idOrganization} = req.params;

        const getMatchServices = new GetMatchServices();

        const result = await getMatchServices.services({idMatch, idOrganization});

        return res.status(200).json(result);
    }
}