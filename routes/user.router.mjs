import express from "express";
import userController from "../controllers/user.controller.mjs";
import authJwt from "../middlewares/authJwt.mjs";

const userRouter = express.Router();

userRouter.get("/api/test/all", userController.allAccess);
userRouter.get("/api/test/user", [authJwt.verifyToken], userController.userBoard);
userRouter.get("/api/test/admin", [authJwt.verifyToken, authJwt.isUserAdmin], userController.userBoard);

export default userRouter;