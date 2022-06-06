import { server } from '../../../testSetup'

describe('Student', () => {
    it('should get students int.', async () => {
        const ret1 = await (await server.getInstance()).callApi('students/ListStudents', {
        })
        expect(ret1.isSucc).toEqual(true)
        expect(ret1.res.classes).not.toBeNull()
    })
})
