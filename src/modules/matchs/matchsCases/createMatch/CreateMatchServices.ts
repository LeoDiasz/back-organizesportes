import { prisma } from "../../../../prisma/client";

interface ICreateMatchServicesRequest {
    local: string;
    date: string;
    hour: string;
    duration: number;
    modality: string;
    numberMaxPlayers: number;
    numberMinPlayers: number;
    organizationId: string;
}

export class CreateMatchServices {
    async service({ local, date, hour, modality, duration, numberMaxPlayers, numberMinPlayers, organizationId }: ICreateMatchServicesRequest) {

        try {

            console.log("Duração", duration)

            if(!date || !hour) {
                throw new Error("Datas Invalidas.");
            }

            if(!duration) {
                throw new Error("É necessário a duração da partida.")
            }

            const [day, month, year] = date.split("/");
            const [hours, minutes] = hour.split(":")
            console.log("day", day, month, year)

            const newDate = new Date(`${year}-${month}-${day}`);
            newDate.setHours(Number(hours))
            newDate.setMinutes(Number(minutes))
            newDate.setHours(newDate.getHours() - 3)
            
            const organization = await prisma.organization.findFirst({ where: { id: organizationId } })

            if (!organization) {
                throw new Error("Não existe organização com esse id.")
            }

            const newMatchStart = new Date(newDate);
            newMatchStart.setMinutes(newMatchStart.getMinutes() + 1)
            newMatchStart.setTime(newMatchStart.getTime() - 3);
            console.log(newMatchStart)

            const newMatchEnd = new Date(newMatchStart);
            newMatchEnd.setHours(newMatchEnd.getHours() + duration)

            const startOfDay = new Date(newMatchStart.getFullYear(), newMatchStart.getMonth(), newMatchStart.getDate(), 0, 0, 0);
            const endOfDay = new Date(newMatchStart.getFullYear(), newMatchStart.getMonth(), newMatchStart.getDate(), 23, 59, 59, 999);

            const existingMatches = await prisma.match.findMany({
                where: {
                    idOrganization: organizationId,
                    dateTime: {
                        gte: startOfDay,
                        lte: endOfDay
                    },
                    local: local,
                    status: {
                        notIn: ['Finalizada', 'Cancelada'] // Não considera partidas já finalizadas ou canceladas
                    }
                },
                select: {
                    id: true,
                    dateTime: true,
                    duration: true,
                    status: true
                }
            });
            
            for (const existingMatch of existingMatches) {
                const existingMatchStart = new Date(existingMatch.dateTime);
                const existingMatchEnd = new Date(existingMatchStart);
                existingMatchEnd.setHours(existingMatchEnd.getHours() + existingMatch.duration);
  
                if (
                    (existingMatchStart.getTime() < newMatchEnd.getTime()) &&
                    (newMatchStart.getTime() < existingMatchEnd.getTime())

                ) {
                    const formattedExistingTime = `${existingMatchStart.getHours() + 3}:${existingMatchStart.getMinutes()}`;
                    throw new Error(
                        `Já existe uma partida agendada para este local das ${formattedExistingTime} com duração de ${existingMatch.duration} ${existingMatch.duration > 1 ? "horas" : "hora"}.`
                    );
                }
            }

            const result = await prisma.match.create({ data: { local, dateTime: newDate, modality, duration, numberMaxPlayers, numberMinPlayers, numberPlayers: 0, idOrganization: organizationId, status: "Agendada" } });

            return result


        } catch (err: any) {
            console.log("erro", err)
            throw new Error(err)
        }

    }
}