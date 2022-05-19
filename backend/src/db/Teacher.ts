import { DbTeacher } from '../shared/db/DbTeacher'
import { Global } from './Global'

const collectionName = 'Teacher'

export const createTeacher = async (newTeacher: DbTeacher) => {
    return Global.collection(collectionName).insertOne(newTeacher)
}
