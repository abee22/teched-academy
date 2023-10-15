import { STUDENT_PATH } from "../constants.js";
import { RecordStatus, Student } from "../type/index.js";
import { writeJsonFile, readJsonFile } from "../util/index.js";

/**
 * `getStudentByEmail` a model function to retrive student basis on student email from storage
 * @param email - Student email id
 * @returns {JSON} - Single student on successfull match
 */
export const getStudentByEmail = async (email: string): Promise<Student | undefined> => {
    const students: Student[] = await readJsonFile(STUDENT_PATH) || [];
    const matchedStudent: Student | undefined = students.find((student: Student) => student.email === email && student.status === RecordStatus.ACTIVE);
    if (matchedStudent) {
        return matchedStudent;
    }
    return;
}

/**
 * `getStudentById` a model function to retrive student basis on student id from storage
 * @param id - Student id
 * @returns {JSON} - Single student on successfull match
 */
export const getStudentById = async (id: string): Promise<Student | undefined> => {
    const students: Student[] = await readJsonFile(STUDENT_PATH) || [];
    const matchedStudent: Student | undefined = students.find((student: Student) => student.id === id && student.status === RecordStatus.ACTIVE);
    if (matchedStudent) {
        return matchedStudent;
    }
    return;
}

/**
 * `getStudents` a model function to retrive all students
 * @returns {JSON} - A list of stuednts
 */
export const getStudents = async (): Promise<Student[]> => {
    const students: Student[] = await readJsonFile(STUDENT_PATH) || [];
    return students;
}

/**
 * `createStudent` a model function to retrive student basis on student id from storage
 * @param student - Student data
 * @returns {JSON} - Single student data which is succefully created
 */
export const createStudent = async (student: Student) => {
    const allStudents: Student[] = await getStudents();
    allStudents.push(student);
    await writeJsonFile(STUDENT_PATH, allStudents);
}