import express, { Router, Response } from 'express';

const router: Router = express.Router();

/**
 * `pingRoute` a function to register ping level routes
 * @returns {Router} - The Express.js router object
 */
export const pingRoute = (): Router => {
    router.get('/', (_, res: Response) => {
        res.json({
            status: 200,
            message: "Ping successfully",
            deploymentMessage: "Project init"
        });
    });
    return router;
}