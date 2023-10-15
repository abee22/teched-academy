import { COURSE_PATH } from "../constants.js";
import { Course } from "../type/index.js";
import { readJsonFile } from "../util/index.js";
import { RecordStatus } from "../type/index.js";

/**
 * `getCourseById` a model function to retrive course basis on course id from storage
 * @param id - The course id
 * @returns {JSON} - Single course on successfull match
 */
export const getCourseById = async (id: string): Promise<Course | undefined> => {
    const courses: Course[] = await readJsonFile(COURSE_PATH) || [];
    const matchedCourse: Course | undefined = courses.find((course: Course) => course.id === id && course.status === RecordStatus.ACTIVE);
    if (matchedCourse) {
        return matchedCourse;
    }
    return;
}

/**
 * `getCourses` a model function to retrive all courses
 * @returns {JSON} - A list of all courses
 */
export const getCourses = async (): Promise<Course[] | undefined> => {
    const courses: Course[] = await readJsonFile(COURSE_PATH) || [];
    return courses;
}