import { client, getTeacherId } from '../client'

// teacher can get courses for a specific class
export async function getCoursesByClassId(teacherId: string, classId: string) {
    const token = await getTeacherId()
    return client.callApi('courses/GetCourses', { teacher_id: teacherId, class_id: classId, jwtToken: token })   
}

// teacher can get all courses
// not used atm
export async function getCourses(teacherId: string) {
    const token = await getTeacherId()
    return client.callApi('courses/GetCourses', { teacher_id: teacherId, jwtToken: token })   
}
