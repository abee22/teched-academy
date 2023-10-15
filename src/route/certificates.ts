import express, { Router } from 'express';
import { issueCertificate, generateKey, verifyCertificate } from '../controller/index.js';
import { studentAuth, collegeAuth } from '../middleware/auth.js';

const router: Router = express.Router();

/**
 * `certificateRoutes` a function to register certificate level routes
 * @returns {Router} - The Express.js router object
 */
export const certificateRoutes = (): Router => {
    router.get('/issue/:studentId/:courseId', studentAuth, issueCertificate);
    router.post('/verify', collegeAuth, verifyCertificate);
    router.get('/key-gen', generateKey);

    return router;
}