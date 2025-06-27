import { Router } from "express";
import { CreateOrganizationController } from "../modules/organizations/organizationCases/createOrganization/CreateOrganizationController";


export const organizationRoutes = Router();

const createOrganizationController = new CreateOrganizationController();

organizationRoutes.post("/", createOrganizationController.handle);


