import { Router } from "express";
import { CreateGuestController } from "../modules/guests/createGuest/CreateGuestController";
import { GetGuestsController } from "../modules/guests/getGuests/GetGuestsController";
import { UpdateConfirmGuestController } from "../modules/guests/updateConfirmGuest/UpdateConfirmGuestController";
import { DeleteGuestController } from "../modules/guests/deleteGuest/DeleteGuestController";

export const guestRoutes = Router();

const createGuestController = new CreateGuestController();
const getGuestsController = new GetGuestsController();
const updateConfirmGuestController = new UpdateConfirmGuestController();
const deleteGuestController = new DeleteGuestController();

guestRoutes.post("/", createGuestController.handle);
guestRoutes.post("/list", getGuestsController.handle);
guestRoutes.put("/", updateConfirmGuestController.handle);
guestRoutes.delete("/", deleteGuestController.handle);



