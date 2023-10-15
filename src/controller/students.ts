import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ValidationResult } from 'joi';
import moment from 'moment';
import { studentSchema } from '../schema/index.js';
import {
    handleValidationResponse,
    handleErrorResponse,
} from '../util/index.js';
import { Course, RecordStatus, Student } from '../type/index.js';
import { createStudent, getCourseById, getStudentByEmail, getStudents as getStudentsModel } from '../model/index.js';

/**
 * `addStudent` function is used to register in student
 * The function need required student information
 * If received data validated successfully, it stores the student in file at `db` location
 * @param {express.Request} req - The Express.js request object
 * @param {express.Response} res - The Express.js response object
 * @returns {JSON} - The newly created record of student
 */
export const addStudent = async (req: Request, res: Response) => {
    try {
        const result: ValidationResult = studentSchema.validate(req.body);
        if (result.error) {
            return handleValidationResponse(result.error, res);
        }

        const { courseId, name: studentName, email: studentEmail } = req.body;
        const course: Course | undefined = await getCourseById(courseId);
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        const student: Student | undefined = await getStudentByEmail(studentEmail);
        if (student) {
            return res.status(400).json({
                message: 'Email already exist'
            });
        }
        const today = moment(new Date(), 'YYYY-MM-DD').toISOString();
        const studentData: Student = {
            id: uuidv4(),
            name: studentName,
            email: studentEmail,
            status: RecordStatus.ACTIVE,
            enrollments: [{
                courseId: courseId,
                startDate: today,
                enrollmentDate: today,
                completionDate: moment(today, 'YYYY-MM-DD').add(course.duration, 'days').toISOString()
            }]
        }
        await createStudent(studentData);
        return res.status(201).json({
            data: {
                ...studentData
            }
        });
    } catch (e) {
        return handleErrorResponse(e, res);
    }
};

/**
 * `getStudents` function is returns list of students in the system
 * @param {express.Request} req - The Express.js request object
 * @param {express.Response} res - The Express.js response object
 * @returns {JSON} - A list of all students
 */
export const getStudents = async (_req: Request, res: Response) => {
    try {
        const students: Student[] = await getStudentsModel();
        return res.status(200).json({
            data: students
        });
    } catch (e) {
        return handleErrorResponse(e, res);
    }
}