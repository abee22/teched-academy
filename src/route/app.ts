import express, { Router } from 'express';
import { pingRoute, studentRoutes, certificateRoutes, authRoutes, courseRoutes } from './index.js';

const router: Router = express.Router();

/**
 * `routes` a function to register app level routes
 * @returns {Router} - The Express.js router object
 */
export const routes = (): Router => {
    router.use('/ping', pingRoute());
    router.use('/students', studentRoutes());
    router.use('/certificates', certificateRoutes());
    router.use('/courses', courseRoutes());
    router.use('/auth', authRoutes());
    return router;
}