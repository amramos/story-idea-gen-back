import express from "express";
import verifySignup from "../middlewares/verifySignUp.mjs";
import authController from "../controllers/auth.controller.mjs";

const authRouter = express.Router();

authRouter.post("/api/auth/signup", [verifySignup.checkDuplicateUserOrEmail, verifySignup.checkRole], authController.signup);
authRouter.post("/api/auth/signin", authController.signin);

export default authRouter;