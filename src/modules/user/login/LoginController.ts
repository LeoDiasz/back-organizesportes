import { Request, Response } from "express";
import { LoginServices } from "./LoginServices";

export class LoginController {
    
    async handle(req: Request, res: Response) {
        const {email, name, phoneNumber, uid} = req.body;

        const loginServices = new LoginServices();

        const resultToken = await loginServices.service({email, name, phoneNumber, uid});

        return res.status(200).json(resultToken);
    }
}