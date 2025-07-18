import { prisma } from "../../../prisma/client";

interface IUpdateConfirmGuestServicesRequest {
    idMatch: string;
    idGuest: string;
    confirmNow: boolean;
}

export class UpdateConfirmGuestServices {

    async services({ idMatch, idGuest, confirmNow }: IUpdateConfirmGuestServicesRequest) {
        if (!idMatch || !idGuest) {
            throw new Error("Necessita do id do convidado e da partida");
        }

        try {
            const result = await prisma.guest.update({ where: { idMatch, id: idGuest }, data: { isConfirm: !confirmNow} });

            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}