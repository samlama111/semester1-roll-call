import { ObjectId } from "mongodb";
import { DbTeacher } from "./DbTeacher";

export interface DbClass {
    _id: ObjectId;
    name: string;
    teacher: ObjectId[];
}