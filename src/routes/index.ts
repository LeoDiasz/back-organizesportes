import { Router } from "express";
import { organizationRoutes } from "./organization.routes";
import { matchRoutes } from "./match.routes";
import { guestRoutes } from "./guest.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/organizations", organizationRoutes);
routes.use("/matchs", matchRoutes);
routes.use("/guests", guestRoutes);
routes.use("/users", userRoutes);

export {routes}