import { ObjectId } from "mongodb"
import { Global } from "./Global"

const collectionName = 'Campus'

export const getCampusById = async (campusId: ObjectId) => {
    return await Global.collection(collectionName).findOne({
        _id: campusId
    })
}