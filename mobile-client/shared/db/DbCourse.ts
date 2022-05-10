import { ObjectId } from "mongodb";
import { DbBaseEntity } from "./DbBaseEntity";
import { DbEnrollment } from "./DbEnrollment";

export interface DbCourse extends DbBaseEntity {
    name: string;
    teacher_id: ObjectId;
    class_id: ObjectId;
    class_name: string;
    enrollments: DbEnrollment[];
    student_ids: ObjectId[];
    campus_id: ObjectId;
}