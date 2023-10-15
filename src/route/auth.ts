import express, { Router } from 'express';
import { collegeAuth, studentAuth } from '../controller/index.js';

const router: Router = express.Router();

/**
 * `authRoutes` a function to register auth level routes
 * @returns {Router} - The Express.js router object
 */
export const authRoutes = (): Router => {
    router.post('/student', studentAuth);
    router.post('/college', collegeAuth);
    return router;
}