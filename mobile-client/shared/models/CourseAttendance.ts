import { DbStudent } from '../db/DbStudent'

export interface CourseAttendance {
    // roll-call dates
    attendance_info: string[];
    student_info: {
        student: DbStudent;
        // array of enrollments
        enrolled: boolean[];
    }[];
    course_name: string;
    class_name: string;
}
