import { prisma } from "../../../../prisma/client";

interface iGetMatchServicesRequest {
    idMatch: string;
    idOrganization: string;
}

export class GetMatchServices {

    async services({ idMatch, idOrganization }: iGetMatchServicesRequest) {
        if (!idMatch || !idOrganization) {
            throw new Error("Necessita dos ids da partida e organização");
        }

        try {
            const result = await prisma.match.findFirst({ where: { id: idMatch, idOrganization: idOrganization }, include: { guests: true } });

            if(!result) {
                throw new Error("Não existe partida com esse id.");
            }

            return result;
        } catch (err: any) {
            throw new Error(err);
        }

    }
}