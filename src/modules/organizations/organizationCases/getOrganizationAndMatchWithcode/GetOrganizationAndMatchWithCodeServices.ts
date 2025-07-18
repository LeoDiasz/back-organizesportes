import { prisma } from "../../../../prisma/client";

interface IGetOrganizationAndMatchWithCodeServicesRequest {
    inviteCode: string;
}

export class GetOrganizationAndMatchWithCodeServices {

    async services({inviteCode}: IGetOrganizationAndMatchWithCodeServicesRequest) {
        
        if(!inviteCode) {
            throw new Error("Necessita do código")
        }

        try {
            
            const match = await prisma.match.findFirst({where: {inviteCode}, include: {organization: true}});

            if(!match) {
                throw new Error("Não existe partida com esse código");
            }

            if(match.status !== "Agendada") {
                throw new Error(`Não é possivel se cadastrar. A partida esta ${match.status}`);

            }

            if(match.numberPlayers >= match.numberMaxPlayers) {
                throw new Error("A partida já atingiu o numero máximo de jogadores");
            }

            return match;
        } catch(err: any) {
            throw new Error(err);
        }
    }
}