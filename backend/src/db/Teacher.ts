import { ObjectId } from 'mongodb'

import { DbTeacher } from '../shared/db/DbTeacher'
import { Global } from './Global'
import { getAllStudents, insertStudent } from './Student'

const collectionName = 'Teacher'

export const insertTeacher = async (newTeacher: DbTeacher) => {
    return Global.collection(collectionName).insertOne(newTeacher)
}

export const getAllTeachers = async () => {
    return Global.collection(collectionName).find({
    }).toArray()
}

export const getTeacherById = async (teacherId: ObjectId) => {
    return Global.collection(collectionName).findOne({
        _id: teacherId
    })
}

export default { insertStudent, getAllStudents, getTeacherById }
