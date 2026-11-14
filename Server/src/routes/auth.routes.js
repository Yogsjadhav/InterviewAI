const express = require("express");
const authController = require("../controller/auth.controller");
const { authUser } = require("../middleware/auth.middleware");

const AuthRouter = express.Router();

// @route POST /api/auth/register
AuthRouter.post("/register", authController.registerUserController);

// @route POST /api/auth/login
AuthRouter.post("/login", authController.LoginUserController);

// @route GEt /api/auth/logout
AuthRouter.get("/logout", authController.LogoutUserController);

// @routet GET /api/auth/get-me
AuthRouter.get("/get-me", authUser, authController.getMeController);

module.exports = AuthRouter;