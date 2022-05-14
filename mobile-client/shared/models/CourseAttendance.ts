import { DbStudent } from "../db/DbStudent";

export interface CourseAttendance {
    date: string;
    students: {
        student: DbStudent;
        enrolled: boolean;
    }[];
}