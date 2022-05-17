import firebaseAdmin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import * as path from 'path'
import { HttpServer } from 'tsrpc'

import { enableAuthentication } from './api/user/enableAuthentication'
import { parseCurrentUser } from './api/user/parseCurrentUser'
import { Global } from './db/Global'
import { serviceProto } from './shared/protocols/serviceProto'

// Create the Server
const server = new HttpServer(serviceProto, {
    port: 3000,
    // Remove this to use binary mode (remove from the client too)
    json: true
})

parseCurrentUser(server)
enableAuthentication(server)

// Initialize before server start
async function init() {
    // Auto implement APIs
    await server.autoImplementApi(path.resolve(__dirname, 'api'))

    // TODO
    // Prepare something... (e.g. connect the db)
    await Global.initDb(server.logger)
    initializeApp({
        credential: firebaseAdmin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // replace `\` and `n` character pairs w/ single `\n` character 
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),  
        }),
    })
}

// Entry function
async function main() {
    await init()
    await server.start()
}
main()
