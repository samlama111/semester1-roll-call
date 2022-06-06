import { ObjectId } from 'mongodb'

import { validateLocation } from '../../../src/models/ValidateLocation'
import { Location } from '../../../src/shared/models/Location'
import { validCampus } from '../../__mocks__/campus'
import { validCourse } from '../../__mocks__/course'

const Course = require('../../../src/db/Course')
const Campus = require('../../../src/db/Campus')
const LocationCalculation = require('../../../src/helpers/location')

jest.mock('../../../src/db/Campus')
jest.mock('../../../src/db/Course')
jest.mock('../../../src/helpers/location')

const validLocation: Location = {
    lat: 50,
    long: 50
}
describe('Validate location', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('should successfuly validate location', async () => {
        Course.getFirstCourseCampusIdByEnrollmentId.mockResolvedValue(validCourse)
        Campus.getCampusById.mockResolvedValue(validCampus)
        LocationCalculation.getDistanceFromLatLonInKm.mockReturnValueOnce(0.1)

        const isLocationValid = await validateLocation(new ObjectId(), validLocation)

        expect(Campus.getCampusById).toHaveBeenCalledTimes(1)
        expect(isLocationValid.value).toBeTruthy()
    })
    it.each([
        // invalid distance between locations
        [1, validCampus, validCourse, 1],   
        [undefined, validCampus, validCourse, 1],
        // campus/course not found
        [0.1, undefined, validCourse, 1],  
        [0.1, validCampus, undefined, 0],
    ])('should not validate location', async (
        distance,
        campus,
        course,
        getCampusCalledTimes
    ) => {
        Course.getFirstCourseCampusIdByEnrollmentId.mockResolvedValue(course)
        Campus.getCampusById.mockResolvedValue(campus)
        LocationCalculation.getDistanceFromLatLonInKm.mockImplementation(() => distance)

        const isLocationValid = await validateLocation(new ObjectId(), validLocation)

        expect(Campus.getCampusById).toHaveBeenCalledTimes(getCampusCalledTimes)
        expect(isLocationValid.value).toBeFalsy()
    })
})
