/* eslint-disable no-undef */

import { ObjectId } from 'mongodb'
import path from 'path'
import { HttpServer } from 'tsrpc'

import { Global } from '../../../src/db/Global'
import { serviceProto, ServiceType } from '../../../src/shared/protocols/serviceProto'

describe('Attendance', () => {
    let server: HttpServer<ServiceType>
    beforeAll(async () => {
        server = new HttpServer(serviceProto)
        await server.autoImplementApi(path.resolve(__dirname, '../../../src/api'))
    
        await server.start()
        await Global.initDb(server.logger)
    })
    afterAll(async () => {
        await server.stop()
    })
    it('should not get courses attendance', async () => {
        const ret1 = await server.callApi('attendance/GetByCourse', {
            course_id: '123' as unknown as ObjectId
        })
        expect(ret1.isSucc).toEqual(false)
    })
})
