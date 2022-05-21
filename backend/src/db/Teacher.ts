import { DbTeacher } from '../shared/db/DbTeacher'
import { Global } from './Global'

const collectionName = 'Teacher'

export const insertTeacher = async (newTeacher: DbTeacher) => {
    return Global.collection(collectionName).insertOne(newTeacher)
}
