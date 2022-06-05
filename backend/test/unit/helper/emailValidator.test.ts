/* eslint-disable max-len */
import { isEmailValid } from '../../../src/helpers/validator'

describe('Valid email', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        // most chars, 64 for part 1 and 63 for part 2
        ['exampleemailexampleemailexampleemailexampleemailexampleemailemai@exampleemailexampleemailexampleemailexampleemailexampleemailema.exampleemail.com'],
        // least chars, 2 and 2
        ['aa@bb.dk'],
        // uppercase and numbers
        ['UPPERCASEEMAILWITHNUMBERSHAVINGALENGTHOF64CHARACTERS111111111111@stud.kea.dk'],
        // all the possible special chars for the first part, hyphens numbers and dots for the second
        ['mare1763!#$%&\'*+-/=?^_`{|}~@stud.kea.dk'],
        ['mare1763@stud-42099.kea84.dk'],
    ])('should return true', async (
        stringInput
    ) => {
        const expectedValidationResult = isEmailValid(stringInput)
        expect(expectedValidationResult).toBeTruthy()
    })

    it.each([
        // 65 chars in the first one, 64 chars in the second after the @, 255 chars altogether in the 3rd
        ['exampleemailexampleemailexampleemailexampleemailexampleemailemail@exampleemailexampleemailexampleemailexampleemailexampleemailema.exampleemail.com'],
        ['exampleemailexampleemailexampleemailexampleemailexampleemailemai@exampleemailexampleemailexampleemailexampleemailexampleemailemai.exampleemail.com'],
        ['exampleemailexampleemailexampleemailexampleemailexampleemai@exampleemailexampleemailexampleemailexampleemailexampleemailema.exampleemailexampleemailexampleemailexampleemailexampleemailema.exampleemailexampleemailexampleemailexampleemailexampleemailema.com'],
        // no at sign, danish character, slovak character
        ['aaaaa.google.com'],
        ['aaaaščťľščž@gmail.com'],
        ['ØØØØØØåæKrak@gmail.com'],
        // 0 characters only for first, second and third part
        ['@aa.dk'],
        ['aa@.dk'],
        ['aa@aa.'],
        // domain name with invalid dot count
        ['a@'],
        ['a@a'],
        ['a@a...']
    ])('should return false', async (
        stringInput
    ) => {
        const expectedValidationResult = isEmailValid(stringInput)
        expect(expectedValidationResult).toBeFalsy()
    })
})
