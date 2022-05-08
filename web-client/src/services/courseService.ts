import { client } from '../client'

// teacher can get courses for a specific class
export async function getCoursesByClassId(teacherId: string, classId: string) {
    return client.callApi('courses/GetCourses', { teacher_id: teacherId, class_id: classId })   
}

// teacher can get all courses
// not used atm
export async function getCourses(teacherId: string) {
    return client.callApi('courses/GetCourses', { teacher_id: teacherId })   
}
