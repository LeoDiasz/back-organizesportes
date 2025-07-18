import { Request, Response } from "express";
import { CreateGuestServices } from "./CreateGuestServices";

export class CreateGuestController {

    async handle(req: Request, res: Response) {
        const body = req.body;

        const createGuestServices = new CreateGuestServices();

        const result = await createGuestServices.service(body);

        return res.status(201).json(result);
    }
}