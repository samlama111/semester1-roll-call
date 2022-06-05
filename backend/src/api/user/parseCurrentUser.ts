import firebaseAdmin from 'firebase-admin'
import { HttpServer } from 'tsrpc'

import { BaseRequest } from '../../shared/protocols/base'

export function parseCurrentUser(server: HttpServer) {
    // Auto parse call.currentUser
    server.flows.preApiCallFlow.push(async (call) => {
        const req = call.req as BaseRequest
        if (req.jwtToken) {
            // idToken comes from the client app
            const idToken = call.req.jwtToken
            const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken)
            // eslint-disable-next-line no-param-reassign
            call.currentUserId = decodedToken.uid
        }
        return call
    })
}

declare module 'tsrpc' {
    export interface ApiCall {
        currentUserId?: string;
    }
}
