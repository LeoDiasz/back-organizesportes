import { prisma } from "../../../../prisma/client";

interface IGetMatchsServicesRequest {
    organizationId: string;
}

export class GetMatchsServices {

    async service({organizationId}: IGetMatchsServicesRequest) {

        try {
            const list = await prisma.match.findMany({where: {idOrganization: organizationId}, include: {guests: true}, orderBy: {dateTime: "desc"}});

            if(!list) {
                throw new Error("Organização não possui partida cadastrada.")
            }
            
            return list;
        } catch(err: any) {
            console.log(err)

            throw new Error(err)
        }

    }
}