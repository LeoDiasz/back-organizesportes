import "dotenv/config";
import { prisma } from "../../../prisma/client";
import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.SECRET || 'fallback_secret_for_dev';

interface ILoginServicesRequest {
    email: string;
    name: string;
    uid: string;
    phoneNumber?: string;
}

interface ITokenPayload {
    email: string;
    name?: string;
    uid?: string;
    phoneNumber?: string | null;
    id?: string;
}

export class LoginServices {

    async service({ email, name, phoneNumber, uid }: ILoginServicesRequest) {
        if (!email) {
            throw new Error("O e-mail é obrigatório para o login");
        }

        try {
            const existingUser = await prisma.user.findFirst({ where: { email } });

            let tokenPayload: ITokenPayload;

            if (existingUser) {
                tokenPayload = {
                    email: existingUser.email,
                    name: existingUser.name,
                    phoneNumber: existingUser.phoneNumber,
                    id: existingUser.id,
                    uid: existingUser.uid
                };

            } else {
                tokenPayload = {
                    email,
                    name,
                    uid,
                    phoneNumber
                };
            }

            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "7d" });

            return token;
        } catch (err: any) {
            console.log(err)
            throw new Error(err);
        }




    }
}