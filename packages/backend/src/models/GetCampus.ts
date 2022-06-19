import { ObjectId } from 'mongodb'

import { getCampusById } from '../db/Campus'
import { validateObjectId } from '../helpers/validator'
import { DbCampus } from '../shared/db/DbCampus'
import { ModelReturnType } from './ModelReturnType'

export const getCampus = async (campusId: ObjectId):
  Promise<ModelReturnType<DbCampus | undefined>> => {
    if (!validateObjectId(campusId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid campus id'
        }
    }
    const campus = await getCampusById(campusId)

    if (!campus) {
        return {
            value: undefined,
            errorMessage: 'No campus found'
        }
    } 
    return {
        value: campus
    }
}
