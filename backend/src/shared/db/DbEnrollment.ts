import { ObjectId } from "mongodb";
import { DbBaseEntity } from "./DbBaseEntity";

export interface DbEnrollment extends DbBaseEntity {
    course_id: ObjectId;
    class_id: ObjectId;
    date: Date;
    roll_call_started: boolean;
    students: [{
        id: ObjectId;
        enrolled: boolean;
    }]
}
