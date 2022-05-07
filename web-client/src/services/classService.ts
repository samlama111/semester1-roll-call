import { client } from '../client'

// teacher can get his classes
export async function getClasses(teacherId: string) {
    const res = await client.callApi('classes/GetClasses', {
        teacher_id: teacherId
    })
    return res
}
