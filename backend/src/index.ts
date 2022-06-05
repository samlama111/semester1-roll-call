import firebaseAdmin from 'firebase-admin'
import * as path from 'path'
import { HttpServer } from 'tsrpc'

import { enableAuthentication } from './api/user/enableAuthentication'
import { parseCurrentUser } from './api/user/parseCurrentUser'
import { Global } from './db/Global'
import { serviceProto } from './shared/protocols/serviceProto'

// Create the Server
export const server = new HttpServer(serviceProto, {
    port: 3000,
    json: true
})

parseCurrentUser(server)
enableAuthentication(server)

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // replace `\` and `n` character pairs w/ single `\n` character 
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),  
    }),
})

// Initialize before server start
async function init() {
    // Auto implement APIs
    await server.autoImplementApi(path.resolve(__dirname, 'api'))
    await Global.initDb(server.logger)
}

// Entry function
async function main() {
    await init()
    if (process.env.NODE_ENV !== 'test') await server.start()
}
main()
