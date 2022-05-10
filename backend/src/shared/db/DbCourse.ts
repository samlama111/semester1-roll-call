import { ObjectId } from "mongodb";
import { DbBaseEntity } from "./DbBaseEntity";
import { DbEnrollment } from "./DbEnrollment";
import { DbStudent } from "./DbStudent";

export interface DbCourse extends DbBaseEntity {
    name: string;
    teacher_id: ObjectId;
    class_id: ObjectId;
    class_name: string;
    enrollments: DbEnrollment[];
    student_ids: [{
        student_id: ObjectId;
    }][];
    campus_id: ObjectId;
}

/**
 * For each enrollment:
 * return list of all students who has this course: 
 * each element is an object with the student, as well as a enrolled boolean
 * 
 * New class CourseAttendance
 */

/**
 * 
 */