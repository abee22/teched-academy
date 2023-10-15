import express, { Router } from 'express';
import { addStudent, getStudents } from '../controller/index.js';

const router: Router = express.Router();

/**
 * `studentRoutes` a function to register student level routes
 * @returns {Router} - The Express.js router object
 */
export const studentRoutes = (): Router => {
    router.post('/', addStudent);
    router.get('/', getStudents);
    return router;
}