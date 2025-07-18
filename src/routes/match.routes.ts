import { Router } from "express";
import { CreateMatchController } from "../modules/matchs/matchsCases/createMatch/CreateMatchController";
import { GetMatchsController } from "../modules/matchs/matchsCases/getMatchs/GetMatchsController";
import { CancelMatchController } from "../modules/matchs/matchsCases/cancelMatch/CancelMatchController";
import { FinishMatchController } from "../modules/matchs/matchsCases/finishMatch/FinishMatchController";
import { DeleteGuestController } from "../modules/guests/deleteGuest/DeleteGuestController";
import { GenerateTokenMatchController } from "../modules/matchs/matchsCases/generateTokenMatch/GenerateTokenMatchController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const matchRoutes = Router();

const createMatchController = new CreateMatchController();
const getMatchsController = new GetMatchsController();
const cancelMatchController = new CancelMatchController();
const finishMatchController = new FinishMatchController();
const deleteGuestController = new DeleteGuestController();
const generateTokenMatchController = new GenerateTokenMatchController();

matchRoutes.post("/", ensureAuthenticated, createMatchController.handle);
matchRoutes.post("/list", ensureAuthenticated, getMatchsController.handle);
matchRoutes.post("/generate/code", ensureAuthenticated, generateTokenMatchController.handle);
matchRoutes.put("/", cancelMatchController.handle);
matchRoutes.put("/finish", ensureAuthenticated, finishMatchController.handle);
matchRoutes.delete("/:idMatch/guests/:idGuest", ensureAuthenticated, deleteGuestController.handle);

