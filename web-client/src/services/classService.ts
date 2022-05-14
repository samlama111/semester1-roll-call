import { client, getTeacherId } from '../client'

// teacher can get his classes
export async function getClasses() {
    const token = await getTeacherId()
    const res = await client.callApi('classes/GetClasses', {
        jwtToken: token
    })
    return res
}
