import { prisma } from "../../../prisma/client";

interface IDeleteGuestServicesRequest {
    idMatch: string;
    idGuest: string;
}

export class DeleteGuestServices {

    async service({ idMatch, idGuest }: IDeleteGuestServicesRequest) {
        if (!idMatch || !idGuest) {
            throw new Error("Necessita do id da partida e do convidado");
        }

        try {
            await prisma.guest.delete({ where: { id: idGuest, idMatch: idMatch } });

            const resultMatch = await prisma.match.update({ where: { id: idMatch }, data: { numberPlayers: { decrement: 1 } } })
            
            return resultMatch;

        } catch (err: any) {
            throw new Error(err);
        }


    }
}