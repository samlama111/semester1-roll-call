import 'dotenv/config'

import firebaseAdmin from 'firebase-admin'
import * as path from 'path'
import { HttpServer } from 'tsrpc'

import { enableAuthentication } from './src/api/user/enableAuthentication'
import { parseCurrentUser } from './src/api/user/parseCurrentUser'
import { Global } from './src/db/Global'
import { serviceProto, ServiceType } from './src/shared/protocols/serviceProto'

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // replace `\` and `n` character pairs w/ single `\n` character 
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),  
    }),
})

// Create the Server
export const server = (function () {
    let singletonServer: HttpServer<ServiceType>

    async function createInstance() {
        const newServer = new HttpServer(serviceProto, {
            port: 3000,
            json: true
        })
        parseCurrentUser(newServer)
        enableAuthentication(newServer)
        
        await newServer.autoImplementApi(path.resolve(__dirname, 'src/api'))
        await Global.initDb(newServer.logger)
        return newServer
    }

    return {
        async getInstance() {
            if (!singletonServer) {
                singletonServer = await createInstance()
            }
            return singletonServer
        }
    }
}())
