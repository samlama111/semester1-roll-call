import { ObjectId } from 'mongodb'

import { DbCourse } from '../../src/shared/db/DbCourse'
import { validEnrollment } from './enrollment'

export const validCourse: DbCourse = {
    _id: new ObjectId(),
    name: 'Course1',
    teacher_id: 'stringstringstringstring',
    class_id: new ObjectId(),
    class_name: 'Geography',
    enrollments: [validEnrollment],
    students: [],
    campus_id: new ObjectId()
}

export const validCourseAttendance = {
    attendance_info: [validEnrollment.date],
    student_info: validCourse.students,
    course_name: validCourse.name,
    class_name: validCourse.class_name,
}

export const validCourses: DbCourse[] = [{
    _id: new ObjectId(),
    name: 'Course1',
    teacher_id: 'stringstringstringstring',
    class_id: new ObjectId(),
    class_name: 'string',
    enrollments: [],
    students: [],
    campus_id: new ObjectId()
}]
