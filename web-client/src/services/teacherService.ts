import { client, getTeacherId } from '../client'
import { splitNameIntoFirstAndLast } from '../shared/models/Util'

export async function registerTeacher(name: string, email: string) {
    const token = await getTeacherId()
    const { firstName, lastName } = splitNameIntoFirstAndLast(name)
    return client.callApi('teachers/CreateTeacher', {
        firstname: firstName, lastname: lastName, email, jwtToken: token 
    })   
}
