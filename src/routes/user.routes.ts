import { Router } from "express";
import { LoginController } from "../modules/user/login/LoginController";

export const userRoutes = Router();

const loginController = new LoginController();

userRoutes.post("/login", loginController.handle);