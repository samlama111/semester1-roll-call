import { ObjectId } from 'mongodb'

import { DbCourse } from '../../src/shared/db/DbCourse'

export const validCourse: DbCourse = {
    _id: new ObjectId(),
    name: 'Course1',
    teacher_id: 'string',
    class_id: new ObjectId(),
    class_name: 'string',
    enrollments: [],
    students: [],
    campus_id: new ObjectId()
}
