import { HttpServer } from 'tsrpc'

import { getUidFromJwt } from '../../helpers/validator'
import { BaseRequest } from '../../shared/protocols/base'

export function parseCurrentUser(server: HttpServer) {
    // Auto parse call.currentUser
    server.flows.preApiCallFlow.push(async (call) => {
        const req = call.req as BaseRequest
        if (req.jwtToken) {
            // idToken comes from the client app
            const idToken = call.req.jwtToken
            // eslint-disable-next-line no-param-reassign
            call.currentUserId = await getUidFromJwt(idToken)
        }
        return call
    })
}

declare module 'tsrpc' {
    export interface ApiCall {
        currentUserId?: string;
    }
}
