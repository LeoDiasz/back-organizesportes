import { Request, Response } from "express";
import { GenerateTokenMatchServices } from "./GenerateTokenMatchServices";



export class GenerateTokenMatchController {

    async handle(req: Request, res: Response) {
        const {idOrganization, idMatch} = req.body;

        const generateTokenMatchServices = new GenerateTokenMatchServices();

        const result = await generateTokenMatchServices.services({idMatch, idOrganization});

        return res.status(201).json(result);
    }
}