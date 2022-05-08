import { ObjectId } from "mongodb";
import { DbEnrollment } from "../db/DbEnrollment";

export interface Attendance {
    class_id: ObjectId | null;
    enrollments: DbEnrollment[] | null;
}