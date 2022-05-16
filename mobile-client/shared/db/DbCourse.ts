import { ObjectId } from 'mongodb'

import { DbBaseEntity } from './DbBaseEntity'
import { DbEnrollment } from './DbEnrollment'
import { DbStudent } from './DbStudent'

export interface DbCourse extends DbBaseEntity {
    name: string;
    // holds the teacher uid from Firebase
    teacher_id: string;
    class_id: ObjectId;
    class_name: string;
    enrollments: DbEnrollment[];
    students: DbStudent[];
    campus_id: ObjectId;
}
