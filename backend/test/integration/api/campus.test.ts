import { ObjectId } from 'mongodb'

import { DbCampus } from '../../../src/shared/db/DbCampus'
import { server } from '../../../testSetup'

describe('Campus', () => {
    let createdCampus: DbCampus | undefined

    it('should create a campus', async () => {
        // Get data before add
        const ret1 = await (await server.getInstance()).callApi('campuses/CreateCampus', {
            address: 'Guldbergsgade 29N',
            name: 'Sams KEA',
            radius: 0.3
        })
        createdCampus = ret1.res?.campus
        expect(ret1.isSucc).toEqual(true)
    })
    it('should get a campus', async () => {
        // Get data before add
        const ret1 = await (await server.getInstance()).callApi('campuses/GetCampus', {
            campus_id: createdCampus?._id as ObjectId
        })

        expect(ret1.isSucc).toEqual(true)
    })
})
