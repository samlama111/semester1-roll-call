import { client, getTeacherId } from '../client'

export async function getAttendanceByCourse(courseId: string) {
    const token = await getTeacherId()
    const res = await client.callApi('attendance/GetByCourse', {
        course_id: courseId,
        jwtToken: token
    })
    return res
}
