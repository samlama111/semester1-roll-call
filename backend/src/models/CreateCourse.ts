import { ObjectId } from 'mongodb'

import { getClassById } from '../db/Class'
import { insertCourse } from '../db/Course'
import { getUidFromJwt, validateObjectId, validateStringName } from '../helpers/validator'
import { DbCourse } from '../shared/db/DbCourse'
import { ModelReturnType } from './ModelReturnType'

export const createCourse = async (
    courseName: string,
    teacherId: string | undefined, 
    classId: ObjectId, 
    campusId: ObjectId
):
  Promise<ModelReturnType<DbCourse | undefined>> => {
    if (teacherId && !getUidFromJwt(teacherId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid teacher id'
        }   
    }
    if (!validateObjectId(campusId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid campus id'
        }  
    }
    if (!validateObjectId(classId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid class id'
        }    
    }
    if (!validateStringName(courseName)) {
        return {
            value: undefined,
            errorMessage: 'Invalid course name'
        }
    }
    
    const classInfo = await getClassById(classId)

    if (!classInfo) {
        return {
            value: undefined,
            errorMessage: 'Class does not exist'
        }
    }

    const newCourse: DbCourse = {
        _id: new ObjectId(),
        name: courseName,
        teacher_id: teacherId as string,
        campus_id: campusId,
        class_id: classId,
        enrollments: [],
        students: [],
        class_name: classInfo?.name as string
    }
     
    const res = await insertCourse(newCourse)

    if (!res.acknowledged) {
        return {
            value: undefined,
            errorMessage: 'Create was not successful'
        }
    }

    return {
        value: newCourse
    }
}
