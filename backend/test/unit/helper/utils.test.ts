import { splitNameIntoFirstAndLast } from '../../../src/shared/models/Util'

describe('String name', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        ['Marek Strucka'],
        ['44 55'],
        ['a'],
        [''],
        ['aa bb cc'],
    ])('should return true', async (
        stringInput
    ) => {
        const expectedValidationResult = splitNameIntoFirstAndLast(stringInput)
        expect(expectedValidationResult).toBeTruthy()
    })
})
