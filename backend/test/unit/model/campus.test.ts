import { convertStringToInt } from '../../../src/helpers/stringHandler'
import { createCampus } from '../../../src/models/CreateCampus'
import { validData } from '../helper/geolocationMockData'

const Campus = require('../../../src/db/Campus')
const Location = require('../../../src/helpers/location')

jest.mock('../../../src/db/Campus')
jest.mock('../../../src/helpers/location')

describe('Campus', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        ['Campus one', 'Avenue 12']
    ])('should create a campus and return it', async (
        name,
        address
    ) => {
        const validLocation = {
            lat: convertStringToInt(validData[0].lat) as number,
            long: convertStringToInt(validData[0].lon) as number
        }
        Location.fetchCoordinatesFromAddress.mockResolvedValue({
            value: validLocation
        })
        Campus.insertCampus.mockResolvedValue({
            acknowledged: true
        })

        await createCampus(name, address)
        
        expect(Location.fetchCoordinatesFromAddress).toHaveBeenCalledTimes(1)

        expect(Campus.insertCampus).toHaveBeenCalledTimes(1)
        expect(Campus.insertCampus).toHaveBeenCalledWith(expect.objectContaining({
            name,
            location: validLocation
        }))
    })

})
