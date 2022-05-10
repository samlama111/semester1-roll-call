import { client, getTeacherId } from '../client'

// teacher can get his classes
export async function getClasses(teacherId: string) {
    const token = await getTeacherId()
    const res = await client.callApi('classes/GetClasses', {
        teacher_id: teacherId,
        jwtToken: token
    })
    return res
}
