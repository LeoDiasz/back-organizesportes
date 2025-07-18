import { CreateMatchServices } from "./CreateMatchServices";
import { Request, Response } from "express";

export class CreateMatchController {

    async handle(req: Request, res: Response) {
        const { local, date, hour, duration, modality, numberMaxPlayers, numberMinPlayers, organizationId } = req.body;

        const matchServices = new CreateMatchServices();

        const result = await matchServices.service({ local, date, hour , duration, modality, numberMaxPlayers, numberMinPlayers, organizationId });

        return res.status(201).json(result);
    }
}