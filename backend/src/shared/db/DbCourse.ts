import { ObjectId } from "mongodb";
import { DbBaseEntity } from "./DbBaseEntity";

export interface DbCourse extends DbBaseEntity {
    name: string;
    teacher_ids: ObjectId[];
    class_ids: ObjectId[];
}