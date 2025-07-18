import { Router } from "express";
import { CreateOrganizationController } from "../modules/organizations/organizationCases/createOrganization/CreateOrganizationController";
import { GetOrganizationController } from "../modules/organizations/organizationCases/getOrganization/GetOrganizationController";
import { GetMatchController } from "../modules/matchs/matchsCases/getMatch/GetMatchController";
import { GetOrganizationAndMatchWithCodeController } from "../modules/organizations/organizationCases/getOrganizationAndMatchWithcode/GetOrganizationAndMatchWithCodeController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const organizationRoutes = Router();

const createOrganizationController = new CreateOrganizationController();
const getOrganizationController = new GetOrganizationController();
const getMatchController = new GetMatchController();
const getOrganizationAndMatchWithCodeController = new GetOrganizationAndMatchWithCodeController();

organizationRoutes.post("/", ensureAuthenticated, createOrganizationController.handle);
organizationRoutes.get("/email", ensureAuthenticated, getOrganizationController.handle);
organizationRoutes.get("/:idOrganization/matchs/:idMatch", getMatchController.handle);
organizationRoutes.get("/:inviteCode", getOrganizationAndMatchWithCodeController.handle);


