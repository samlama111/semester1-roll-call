/* eslint-disable no-undef */
import { HttpClient } from 'tsrpc'

import { serviceProto } from '../../src/shared/protocols/serviceProto'

// 1. EXECUTE `npm run dev` TO START A LOCAL DEV SERVER
// 2. EXECUTE `npm test` TO START UNIT TEST

describe('Campus', () => {
    // Create the Server
    const client = new HttpClient(serviceProto, {
        server: 'http://127.0.0.1:3000',
    })

    it('should create a campus', async () => {
        // Get data before add
        const ret1 = await client.callApi('campuses/CreateCampus', {
            address: 'Guldbergsgade 29N',
            name: 'Sams KEA'
        })
        expect(ret1.isSucc).toEqual(true)
    })
})
