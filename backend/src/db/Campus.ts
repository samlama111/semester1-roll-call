import { ObjectId } from 'mongodb'

import { DbCampus } from '../shared/db/DbCampus'
import { Global } from './Global'

const collectionName = 'Campus'

export const getCampusById = async (campusId: ObjectId) => {
    return Global.collection(collectionName).findOne({
        _id: campusId
    })
}
export const insertCampus = async (newCampus: DbCampus) => {
    return Global.collection(collectionName).insertOne(newCampus)
}
