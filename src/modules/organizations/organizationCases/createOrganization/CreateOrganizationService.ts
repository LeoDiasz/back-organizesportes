import { prisma } from "../../../../prisma/client"

type ICreateOrganizationRequest = {
    name: string
    email: string
    phoneNumber: string
    nameUser: string
    modality: string
    uid: string
}

export class CreateOrganizationService {
    async service({ name, email, phoneNumber, nameUser, modality, uid }: ICreateOrganizationRequest) {

        const newUser = await prisma
            .user
            .create({ data: { email: email, name: nameUser, uid: uid, phoneNumber: phoneNumber } })

        if (newUser) {
            const createOrganization = await prisma.organization.create({ data: { modality, name, userId: newUser.id } })

            const dataFormatted = {
                ...createOrganization,
                nameUser: newUser.name,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber
            }

            return dataFormatted

        }

    }
}