import { client } from '../client'

export async function getAttendanceByCourse(courseId: string) {
    const res = await client.callApi('attendance/GetByCourse', {
        course_id: courseId
    })
    return res
}
