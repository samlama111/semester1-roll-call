import { ObjectId } from 'mongodb'

import { DbClass } from '../shared/db/DbClass'
import { Global } from './Global'

const collectionName = 'Class'

export const getClassById = async (classId: ObjectId) => {
    return Global.collection(collectionName).findOne({
        _id: classId
    })
}
export const getAllClasses = async () => {
    return Global.collection(collectionName).find({
    }).toArray()
}
export const insertClass = async (newClass: DbClass) => {
    return Global.collection(collectionName).insertOne(newClass)
}
export default { insertClass, getClassById }
