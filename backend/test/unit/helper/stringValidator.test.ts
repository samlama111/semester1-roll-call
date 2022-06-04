import { validateObjectId, validateStringName, validateStringPersonName } from '../../../src/helpers/validator'

describe('String name', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        ['aa'],
    ])('should return true', async (
        stringInput
    ) => {
        const expectedValidationResult = validateStringName(stringInput)
        expect(expectedValidationResult).toBeTruthy()
    })

    it.each([
        ['a'],
        [''],
        ['aaa5'],
        ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
    ])('should return false', async (
        stringInput
    ) => {
        const expectedValidationResult = validateStringName(stringInput)
        expect(expectedValidationResult).toBeFalsy()
    })
})

describe('String person name', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        ['aa'],
    ])('should return true', async (
        stringInput
    ) => {
        const expectedValidationResult = validateStringPersonName(stringInput)
        expect(expectedValidationResult).toBeTruthy()
    })

    it.each([
        ['a'],
        [''],
        ['aaa5'],
        ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
    ])('should return false', async (
        stringInput
    ) => {
        const expectedValidationResult = validateStringPersonName(stringInput)
        expect(expectedValidationResult).toBeFalsy()
    })
})

describe('Object id', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        // randomly created to satisfy the length
        ['62420dec4200089f1587cd64'],
        // taken from the DB
        ['62779dec40a0089f1587af53'],
    ])('should return true', async (
        stringInput
    ) => {
        const expectedValidationResult = validateObjectId(stringInput)
        expect(expectedValidationResult).toBeTruthy()
    })

    it.each([
        // 1 character less, one character more
        ['62779de40a0089f1587af53'],
        ['62779decc40a0089f1587af53'],

    ])('should return false', async (
        stringInput
    ) => {
        const expectedValidationResult = validateObjectId(stringInput)
        expect(expectedValidationResult).toBeFalsy()
    })
})
