"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const LoginController_1 = require("../modules/user/login/LoginController");
exports.userRoutes = (0, express_1.Router)();
const loginController = new LoginController_1.LoginController();
exports.userRoutes.post("/login", loginController.handle);
