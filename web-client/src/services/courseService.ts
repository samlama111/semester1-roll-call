import { client } from '../client'

// teacher can get courses for a specific class
export async function getCoursesByClassId(teacherId: string, classId: string) {
    return client.callApi('courses/GetCourses', { teacher_id: teacherId, class_id: classId })   
}

// teacher can get courses for a specific class
export async function getCourses() {
    return client.callApi('courses/GetCourses', { teacher_id: '627413d48f24d2c629f5694f' })   
}
