import { ObjectId } from "mongodb";
import { DbBaseEntity } from "./DbBaseEntity";

export interface DbEnrollment extends DbBaseEntity {
    date: string;
    roll_call_started: boolean;
    // holds student uids from Firebase
    enrolled_student_ids: string[];
}
