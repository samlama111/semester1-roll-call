import { ObjectId } from "mongodb";
import { DbBaseEntity } from "./DbBaseEntity";

export interface DbClass extends DbBaseEntity {
    name: string;
    teacher_ids: ObjectId[];
}