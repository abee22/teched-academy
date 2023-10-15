import { Request, Response } from 'express';
import { ValidationResult } from 'joi';
import jwt from "jsonwebtoken";
import { studentAuthSchema } from '../schema/index.js';
import { handleValidationResponse } from '../util/index.js';
import { Student } from '../type/index.js';
import { getStudentByEmail } from '../model/index.js';

/**
 * Auth function to authenticate and issue JWT token to student.
 * The function requires student email id in request body.
 * On successfull authentication, a bearer token is generated and sent in response.
 * @param {express.Request} req - The Express.js request object
 * @param {express.Response} res - The Express.js response object
 * @returns {JSON} - A JSON response
 */
export const studentAuth = async (req: Request, res: Response) => {
    const result: ValidationResult = studentAuthSchema.validate(req.body);
    if (result.error) {
        return handleValidationResponse(result.error, res);
    }

    const { email } = req.body;
    const student: Student | undefined = await getStudentByEmail(email);
    if (!student) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }
    const token = jwt.sign(
        {
            email,
            id: student.id
        },
        process.env.JWT_SECRET || ""
    );
    return res.status(404).json({
        token
    });
}

/**
 * Auth function to authenticate and issue JWT token to college or organization.
 * On successfull authentication, a bearer token is generated and sent in response.
 * @param {express.Request} req - The Express.js request object
 * @param {express.Response} res - The Express.js response object
 * @returns {JSON} - A JSON response
 */
export const collegeAuth = (_req: Request, res: Response) => {
    const token = jwt.sign(
        {},
        process.env.JWT_SECRET || ""
    );
    return res.status(404).json({
        token
    });
}