import { Request, Response } from "express";
import { GetGuestsServices } from "./GetGuestsServices";


export class GetGuestsController {
    
    async handle(req: Request, res: Response) {
        const { idMatch } = req.body;
        
        const getGuestsServices = new GetGuestsServices();

        const result = getGuestsServices.services(idMatch);

        return res.status(200).json(result);
    }
}