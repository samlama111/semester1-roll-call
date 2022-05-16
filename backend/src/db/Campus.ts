import { ObjectId } from "mongodb"
import { DbCampus } from "../shared/db/DbCampus"
import { Global } from "./Global"

const collectionName = 'Campus'

export const getCampusById = async (campusId: ObjectId) => {
    return await Global.collection(collectionName).findOne({
        _id: campusId
    })
}
export const insertCampus = async (newCampus: DbCampus) => {
    return await Global.collection(collectionName).insertOne(newCampus)
}