import { WsServer } from "tsrpc";
import { BaseRequest } from "../../shared/protocols/base";
import firebaseAdmin from 'firebase-admin'

export function parseCurrentUser(server: WsServer) {
    // Auto parse call.currentUser
    server.flows.preApiCallFlow.push(async call => {
        let req = call.req as BaseRequest;
        if (req.jwtToken) {
            // idToken comes from the client app
            const idToken = call.req.jwtToken
            const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken)
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