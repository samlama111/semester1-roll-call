import { ObjectId } from "mongodb";
import { DbBaseEntity } from "./DbBaseEntity";
import { DbEnrollment } from "./DbEnrollment";

export interface DbCourse extends DbBaseEntity {
    name: string;
    teacher_ids: ObjectId[];
    class_ids: ObjectId[];
    enrollments: DbEnrollment[];
}