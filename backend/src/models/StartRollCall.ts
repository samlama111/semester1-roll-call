import { ObjectId } from 'mongodb'

import { addEnrollmentToCourse, getMostRecentTeachersCourseEnrollment } from '../db/Course'
import { validateObjectId } from '../helpers/validator'
import { DbEnrollment } from '../shared/db/DbEnrollment'
import { ModelReturnType } from './ModelReturnType'
    
export const startRollCall = async (courseId: ObjectId, teacherId?: string):
 Promise<ModelReturnType<DbEnrollment | undefined>> => {
    if (!validateObjectId(courseId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid course id'
        }
    }
    const isCourseEnrollmentActive = await getMostRecentTeachersCourseEnrollment(courseId, teacherId)

    if (isCourseEnrollmentActive) {
        return {
            value: undefined,
            errorMessage: 'Enrollment already active'
        }
    }
    const newEnrollment: DbEnrollment = {
        _id: new ObjectId(),
        date: new Date().toISOString(),
        roll_call_started: true,
        enrolled_student_ids: [],
    }

    const res = await addEnrollmentToCourse(courseId, newEnrollment)

    if (!res.acknowledged && res.modifiedCount < 1) {
        return {
            value: undefined,
            errorMessage: 'Roll call could not be started'
        }
    }

    return {
        value: newEnrollment
    }

}
