import express from "express";
import verifySignup from "../middlewares/verifySignUp.mjs";
import movieController from "../controllers/movie.controller.mjs";

const movieRouter = express.Router();

movieRouter.post("/api/movie/add", movieController.add);
movieRouter.get("/api/movie/getAll", movieController.getAll);

export default movieRouter;