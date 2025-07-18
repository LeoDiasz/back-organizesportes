import { Request, Response } from "express";
import { DeleteGuestServices } from "./DeleteGuestServices";

export class DeleteGuestController {

    async handle(req: Request, res: Response) {
        const { idGuest, idMatch} = req.params;

        const deleteGuestServices = new DeleteGuestServices();

        const result = await deleteGuestServices.service({idGuest, idMatch});

        return res.status(204).json(result);
    }
}