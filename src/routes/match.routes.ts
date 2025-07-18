import { Router } from "express";
import { CreateMatchController } from "../modules/matchs/matchsCases/createMatch/CreateMatchController";
import { GetMatchsController } from "../modules/matchs/matchsCases/getMatchs/GetMatchsController";
import { CancelMatchController } from "../modules/matchs/matchsCases/cancelMatch/CancelMatchController";
import { FinishMatchController } from "../modules/matchs/matchsCases/finishMatch/FinishMatchController";
import { DeleteGuestController } from "../modules/guests/deleteGuest/DeleteGuestController";
import { GenerateTokenMatchController } from "../modules/matchs/matchsCases/generateTokenMatch/GenerateTokenMatchController";

export const matchRoutes = Router();

const createMatchController = new CreateMatchController();
const getMatchsController = new GetMatchsController();
const cancelMatchController = new CancelMatchController();
const finishMatchController = new FinishMatchController();
const deleteGuestController = new DeleteGuestController();
const generateTokenMatchController = new GenerateTokenMatchController();

matchRoutes.post("/", createMatchController.handle);
matchRoutes.post("/list", getMatchsController.handle);
matchRoutes.post("/generate/code", generateTokenMatchController.handle);
matchRoutes.get("/:idMatch/organization")
matchRoutes.put("/", cancelMatchController.handle);
matchRoutes.put("/finish", finishMatchController.handle);
matchRoutes.delete("/:idMatch/guests/:idGuest", deleteGuestController.handle);

