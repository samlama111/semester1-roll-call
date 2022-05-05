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
    const res = await client.callApi('GetClasses', {
        teacher_id: '6273eaa28f24d2c629f5694d'
    })
    console.log(res.isSucc, res.err?.message)
    return res
}
