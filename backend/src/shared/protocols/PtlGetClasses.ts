import { ObjectId } from "mongodb";
import { DbClass } from "../db/DbClass";

export interface ReqGetClasses {
    teacher_id: ObjectId;
}

export interface ResGetClasses {
    classes: DbClass[];
}