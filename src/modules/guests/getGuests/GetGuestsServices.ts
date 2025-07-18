import { prisma } from "../../../prisma/client";

interface IGetGuestsServicesRequest {
    idMatch: string;
}

export class GetGuestsServices {

    async services({idMatch}: IGetGuestsServicesRequest) {        
        if(!idMatch) {
            throw new Error("Necessário o id da partida");
        }

        try {
            const result = await prisma.guest.findMany({where: {idMatch}});

            return result;
        } catch(err: any) {
            throw new Error(err);
        }
    }
}