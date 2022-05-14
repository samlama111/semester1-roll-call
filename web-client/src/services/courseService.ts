import { client, getTeacherId } from '../client'

// teacher can get courses for a specific class
export async function getCoursesByClassId(classId: string) {
    const token = await getTeacherId()
    return client.callApi('courses/GetCourses', { class_id: classId, jwtToken: token })   
}

// teacher can get all courses
// not used atm
export async function getCourses() {
    const token = await getTeacherId()
    return client.callApi('courses/GetCourses', { jwtToken: token })   
}
