import { RecordStatus } from "./index.js";

type StudentCourse = {
    courseId: string;
    enrollmentDate: string;
    startDate: string;
    completionDate: string;
}

export type Student = {
    id?: string;
    name: string;
    email: string;
    enrollments: StudentCourse[];
    status: RecordStatus;
}