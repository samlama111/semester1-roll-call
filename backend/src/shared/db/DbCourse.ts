import { ObjectId } from "mongodb";
import { DbBaseEntity } from "./DbBaseEntity";

export interface DbCourse extends DbBaseEntity {
    name: string;
    teacher_id: ObjectId;
    class_id: ObjectId;
    class_name: string;
}