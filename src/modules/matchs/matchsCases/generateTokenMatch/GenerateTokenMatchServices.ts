import crypto from "crypto";
import { prisma } from "../../../../prisma/client";

interface IGenerateTokenMatchServices {
    idOrganization: string;
    idMatch: string;
}

const generateShortCode = (length: number = 8): string => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

const generateUniqueInviteCode = async (retries: number = 5): Promise<string> => {
    let code: string;
    let attempts = 0;
    let isUnique = false;

    while (!isUnique && attempts < retries) {
        code = generateShortCode();
        const isExistingMatch = await prisma.match.findFirst({ where: { inviteCode: code }, select: { id: true } });

        if (!isExistingMatch) {
            isUnique = true;
        } else {
            attempts++;
        }
    }

    return code!;
}

export class GenerateTokenMatchServices {

    async services({ idOrganization, idMatch }: IGenerateTokenMatchServices) {
        if (!idOrganization || !idMatch) {
            throw new Error("Necessita do id da organização e da partida.");
        }

        try {
            const newInviteCode = await generateUniqueInviteCode();

            const match = await prisma.match.findFirst({ where: { id: idMatch, idOrganization } })

            if (!match) {
                throw new Error("Não existe partida cadastrada.");
            }

            const result = await prisma.match.update({ where: { id: idMatch, idOrganization }, data: { inviteCode: newInviteCode }, select: { inviteCode: true } });

            return result;
        } catch (err: any) {
            throw new Error("Não foi possivel gerar o código da partida.")
        }
    }
}