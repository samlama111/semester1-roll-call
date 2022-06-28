import { DbBaseEntity } from './DbBaseEntity'

export interface DbEnrollment extends DbBaseEntity {
    date: string;
    roll_call_started: boolean;
    end_date: string;
    // holds student uids from Firebase
    enrolled_student_ids: string[];
}
