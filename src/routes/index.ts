import { Router } from "express";
import { organizationRoutes } from "./organization.routes";


const routes = Router();

routes.use("/organizations", organizationRoutes);

export {routes}