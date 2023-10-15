import { Request, Response } from 'express';
import { handleErrorResponse } from '../util/index.js';
import { Course } from '../type/index.js';
import { getCourses as getCoursesModel } from '../model/index.js';

/**
 * `getCourses` function is used to return list of all courses
 * @param {express.Request} req - The Express.js request object
 * @param {express.Response} res - The Express.js response object
 * @returns {JSON} - A list of all courses
 */
export const getCourses = async (_req: Request, res: Response) => {
    try {
        const course: Course[] = await getCoursesModel() || [];
        return res.status(200).json({
            data: course
        });
    } catch (e) {
        return handleErrorResponse(e, res);
    }
}