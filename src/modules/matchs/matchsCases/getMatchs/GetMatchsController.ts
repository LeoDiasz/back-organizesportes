import { Request, Response } from "express";
import { GetMatchsServices } from "./GetMatchsServices";



export class GetMatchsController {

    async handle(req: Request, res: Response) {
        const {organizationId} = req.body;

        const getMatchServices = new GetMatchsServices;

        const result = await getMatchServices.service({organizationId});

        return res.status(200).json(result);
            
        
    }
}