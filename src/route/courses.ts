import express, { Router } from 'express';
import { getCourses } from '../controller/index.js';

const router: Router = express.Router();

/**
 * `courseRoutes` a function to register course level routes
 * @returns {Router} - The Express.js router object
 */
export const courseRoutes = (): Router => {
    router.get('/', getCourses);
    return router;
}