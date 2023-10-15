import express, { Express, Router } from "express";
import dotenv from 'dotenv';
import { routes } from "../route/index.js";

/**
 * Function to initialize express and attach root level route to express
 * This function also initializes `donenv`, which is used to get env values
 * @returns Express
 */
export const init = (): Express => {
    const app: Express = express();
    dotenv.config();
    app.use(express.json());
    const router: Router = express.Router();
    router.use("/api/v1", routes());
    app.use(router);
    return app;
}