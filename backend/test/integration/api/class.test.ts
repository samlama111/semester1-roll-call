import { server } from '../../../testSetup'

describe('Class', () => {
    it('should list classes', async () => {
        const ret1 = await (await server.getInstance()).callApi('classes/ListClasses', {
        })
        expect(ret1.isSucc).toEqual(true)
        expect(ret1.res.classes).not.toBeNull()
    })
})
