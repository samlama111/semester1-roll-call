/* eslint-disable no-undef */

import path from 'path'
import { HttpServer } from 'tsrpc'

import { Global } from '../../../src/db/Global'
import { serviceProto, ServiceType } from '../../../src/shared/protocols/serviceProto'

describe('Campus', () => {
    let server: HttpServer<ServiceType>
    beforeAll(async () => {
        server = new HttpServer(serviceProto)
        await server.autoImplementApi(path.resolve(__dirname, '../../src/api'))
    
        await server.start()
        await Global.initDb(server.logger)
    })
    it('should create a campus', async () => {
        // Get data before add
        const ret1 = await server.callApi('campuses/CreateCampus', {
            address: 'Guldbergsgade 29N',
            name: 'Sams KEA'
        })
        expect(ret1.isSucc).toEqual(true)
    })
})
