import { DbStudent } from '../shared/db/DbStudent'
import { Global } from './Global'

const collectionName = 'Student'

export const insertStudent = async (newStudent: DbStudent) => {
    return Global.collection(collectionName).insertOne(newStudent)
}
export const getAllStudents = async () => {
    return Global.collection(collectionName).find({
    }).toArray()
}
