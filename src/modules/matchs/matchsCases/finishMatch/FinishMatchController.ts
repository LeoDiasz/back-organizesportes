import { Request, Response } from "express";
import { FinishMatchServices } from "./FinishMatchServices";


export class FinishMatchController {

    async handle(req: Request, res: Response) {
        const {id, idOrganization} = req.body;

        const finishMatchServices = new FinishMatchServices();

        const result = await finishMatchServices.service({id, idOrganization});

        return res.status(200).json(result);

    }
}