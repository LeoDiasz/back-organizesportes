import { Request, Response } from "express";
import { UpdateConfirmGuestServices } from "./UpdateConfirmGuestServices";


export class UpdateConfirmGuestController {

    async handle(req: Request, res: Response) {
        const {idMatch, idGuest, confirmNow} = req.body;

        const updateConfirmGuestServices = new UpdateConfirmGuestServices();

        const result = await updateConfirmGuestServices.services({confirmNow, idGuest, idMatch});

        return res.status(200).json(result);
        
    }
}