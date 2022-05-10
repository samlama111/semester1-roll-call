import { ObjectId } from "mongodb";
import { DbStudent } from "../db/DbStudent";

export interface CourseAttendance {
    date: Date,
    students: [{
        student: DbStudent;
        enrolled: boolean;
    }]
}