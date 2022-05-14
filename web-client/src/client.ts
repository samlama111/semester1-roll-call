import { getAuth } from 'firebase/auth'
import { WsClient } from 'tsrpc-browser'

import { serviceProto } from './shared/protocols/serviceProto'

// Create Client
export const client = new WsClient(serviceProto, {
    server: 'ws://127.0.0.1:3000',
    // Remove this to use binary mode (remove from the server too)
    json: true,
    logger: console,
})
export const getTeacherId = async () => {
    const user = getAuth()
    const token = await user.currentUser?.getIdToken()
    return token
}
export const connect = async () => {
    if (!client.isConnected) {
        const res = await client.connect()
        if (!res.isSucc) return Promise.reject(new Error('WS connection failed'))
    }
    return true
}
