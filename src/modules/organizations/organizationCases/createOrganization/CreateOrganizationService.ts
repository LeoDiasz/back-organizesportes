import AppError from "../../../../errors/AppError"
import { prisma } from "../../../../prisma/client"

type ICreateOrganizationRequest = {
    name: string
    email?: string
    phoneNumber?: string
    nameUser?: string
    modality: string
    uid?: string
}

export class CreateOrganizationService {
    async service({ name, email, phoneNumber, nameUser, modality, uid }: ICreateOrganizationRequest) {
      if (!name || !modality) {
        throw new Error('Não foi possível criar a organização. Verifique se "nome" e "modalidade" foram fornecidos.');
      }

      if(!email || !nameUser || !uid) {
        throw new Error("Necessita das informações do usuário.")
      }

      const existingUser = await prisma.user.findFirst({where: {email: email}});

      if (existingUser) {
        throw new Error('Já existe uma organização criada com esse e-mail.');
      }

      const newUser = await prisma.user.create({
        data: { 
          email: email,
          name: nameUser!,
          uid: uid!,
          phoneNumber: phoneNumber,
        },
      });

      console.log("Novo usuário criado:", newUser);

      if (newUser) {
        const createOrganization = await prisma.organization.create({
          data: {
            modality,
            name,
            userId: newUser.id,
          },
        });

        console.log("Organização criada:", createOrganization);

        const dataFormatted = {
          ...createOrganization,
          nameUser: newUser.name,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
        };

        return dataFormatted;

      } else {

        throw new Error('Não foi possível criar a organização porque o usuário não foi criado.');
      }
  }
}

    


