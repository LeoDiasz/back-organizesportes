import { prisma } from "../../../../prisma/client";


interface IFinishMatchServicesRequest {
    id: string;
    idOrganization: string;
}

export class FinishMatchServices {

    async service({id, idOrganization}: IFinishMatchServicesRequest) {
        if(!id || !idOrganization) {
            throw new Error("Necessita do id da partida e da organização");
        }

        try {
            const result = await prisma.match.update({where: {id, idOrganization}, data: {status: "Finalizada"}});

            return result;
        } catch(err: any) {
            throw new Error(err)
        }
    }
}