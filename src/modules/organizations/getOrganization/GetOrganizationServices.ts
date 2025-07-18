import { prisma } from "../../../prisma/client";

interface IGetOrganizationRequest {
    email: string;
}

export class GetOrganizationServices {

    async service({email}: IGetOrganizationRequest) {
        if(!email) {
            throw new Error("Não foi possivel realizar a busca.");
        }

        try {
            const organization = await prisma.organization.findFirst({where: {user: {email}}});

            if(!organization) {
                throw new Error("Não existe organização criada com esse e-mail.")
            }

            return organization;
        } catch(err: any) {
            console.log("err", err)
            throw new Error(err)
        }
    }
}