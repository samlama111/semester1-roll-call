import { HttpClient } from 'tsrpc-browser'

import { serviceProto } from './shared/protocols/serviceProto'

// Create Client
export const client = new HttpClient(serviceProto, {
    server: 'http://127.0.0.1:3000',
    // Remove this to use binary mode (remove from the server too)
    json: true,
    logger: console,
})

export async function getClasses() {
    const res = await client.callApi('classes/GetClasses', {
        teacher_id: '627413d48f24d2c629f5694f'
    })
    return res
}
