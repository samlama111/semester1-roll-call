import { getMostRecentStudentEnrollment } from '../db/Course'
import { ResGetRollCall } from '../shared/protocols/roll-call/PtlGetRollCall'
import { ModelReturnType } from './ModelReturnType'
    
export const getStudentRollCall = async (studentId?: string):
 Promise<ModelReturnType<ResGetRollCall | undefined>> => {
    let studentIsEnrolled = false

    const lastEnrollment = await getMostRecentStudentEnrollment(studentId)

    if (!lastEnrollment || !lastEnrollment.enrollments[0]) {
        return {
            value: undefined,
            errorMessage: 'No ongoing roll call found'
        }
    }

    // check if student is enrolled
    studentIsEnrolled = !!lastEnrollment.enrollments[0].enrolled_student_ids
        .some((val: string) => val === studentId)

    return {
        value: {
            is_student_enrolled: studentIsEnrolled,
            roll_call_id: lastEnrollment.enrollments[0]._id,
            course_info: {
                name: lastEnrollment.name,
                class_name: lastEnrollment.class_name,
            }
        }
    }

}
