import { server } from '../../../src'

describe('Campus', () => {
    it('should create a campus', async () => {
        // Get data before add
        const ret1 = await server.callApi('campuses/CreateCampus', {
            address: 'Guldbergsgade 29N',
            name: 'Sams KEA',
            radius: 0.3
        })
        expect(ret1.isSucc).toEqual(true)
    })
})
