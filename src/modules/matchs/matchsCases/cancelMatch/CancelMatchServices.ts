import { prisma } from "../../../../prisma/client";

interface ICancelMatchServicesRequest {
    id: string;
    idOrganization: string;
}

export class CancelMatchServices {

    async service({id, idOrganization}: ICancelMatchServicesRequest) {
        if(!id) {
            throw new Error("Necessita do ID")
        }

        try {
            const result = await prisma.match.update({where: {id, idOrganization}, data: {status: "Cancelada"}});

            return result;
        } catch(err: any) {
            throw new Error(err)
        }

        
        
    }
}