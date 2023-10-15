import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { getStudentByEmail } from '../model/index.js';
import { Student } from '../type/index.js';

/**
 * `studentAuth` ia middleware function used to authenticate student requests
 * It validates the request by parsing JWT token present in header of request
 * If invalid or expired token received, it returns 401 - Unauthotized response
 * @param {express.Request} req - The Express.js request object
 * @param {express.Response} res - The Express.js response object
 * @param {express.Response} next - The Express.js next function
 */
export const studentAuth = async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.header("Authorization");
    const token = bearerToken?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send();
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET || "") as any;

    if (payload?.id) {
        const student: Student | undefined = await getStudentByEmail(payload.email);
        if (student) {
            return next();
        }
    }
    return res.status(401).send();
}

/**
 * `collegeAuth` ia middleware function used to authenticate college requests
 * It validates the request by parsing JWT token present in header of request
 * If invalid or expired token received, it returns 401 - Unauthotized response
 * @param {express.Request} req - The Express.js request object
 * @param {express.Response} res - The Express.js response object
 * @param {express.Response} next - The Express.js next function
 */
export const collegeAuth = async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.header("Authorization");
    const token = bearerToken?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send();
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET || "") as any;

    if (payload) {
        return next();
    }
    return res.status(401).send();
}