import cors from "cors";
import express from "express";
import "./loadEnvironment.mjs";
import userRouter from "../routes/user.router.mjs";
import authRouter from "../routes/auth.router.mjs";

const configureApp = (app) => {
    const origin = process.env.CORS_ORIGIN;

    let corsOptions;
    if (origin) {
        corsOptions = {
            origin: origin
        }
    } else {
        corsOptions = {}
    };
    app.use(cors(corsOptions));
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.use("/", authRouter);
    app.use("/", userRouter);

    return app;
}

export default configureApp;