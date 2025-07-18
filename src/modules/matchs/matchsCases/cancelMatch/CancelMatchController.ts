import { Request, Response } from "express";
import { CancelMatchServices } from "./CancelMatchServices";

export class CancelMatchController {
    async handle(req: Request, res: Response) {
        const {id, idOrganization} = req.body;

        const cancelMatchServices = new CancelMatchServices();

        const result = cancelMatchServices.service({id, idOrganization});

        return res.status(200).json(result);
    }
}