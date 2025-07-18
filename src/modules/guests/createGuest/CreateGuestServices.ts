import { prisma } from "../../../prisma/client";

interface ICreateGuestRequest {
    name: string;
    email: string;
    phoneNumber: string;
    preferencePosition: string;
    matchId: string;
    idOrganization: string;
}

export class CreateGuestServices {

    async service({ name, email, phoneNumber, preferencePosition, matchId, idOrganization }: ICreateGuestRequest) {
        if (!email) {
            throw new Error("Necessita de e-mail para se cadastrar.");
        }

        if (!matchId) {
            throw new Error("Necessita do id da partida.")
        }

        try {
            const existsGuestInMatch = await prisma.guest.findFirst({ where: { email, idMatch: matchId, match: { idOrganization } } });

            console.log("exists", existsGuestInMatch)
            if (existsGuestInMatch) {
                throw new Error("Este email/jogador já esta registrado na partida.");
            }

            const existsMatch = await prisma.match.findFirst({ where: { id: matchId, idOrganization } });

            if (!existsMatch) {
                throw new Error("Não existe essa partida.")
            }

            if (existsMatch.status !== "Agendada") {
                throw new Error(`Não é possivel se cadastrar. A partida esta ${existsMatch.status}`);

            }

            if (existsMatch.numberPlayers >= existsMatch.numberMaxPlayers) {
                return new Error("A partida já atingiu o numero máximo de jogadores");
            }

            const result = await prisma.guest.create({ data: { name, email, phoneNumber, preferencePosition, idMatch: matchId } });

            if (result) {
                await prisma.match.update({ where: { id: matchId }, data: { numberPlayers: { increment: 1 } } });
            }

            return result;

        } catch (err: any) {
       
            throw new Error(err)
        }
    }
}