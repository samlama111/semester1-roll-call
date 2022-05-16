import 'dotenv/config'

import {
    Collection, Db, MongoClient, OptionalId 
} from 'mongodb'
import { Logger } from 'tsrpc'

import { DbCampus } from '../shared/db/DbCampus'
import { DbClass } from '../shared/db/DbClass'
import { DbCourse } from '../shared/db/DbCourse'
import { DbEnrollment } from '../shared/db/DbEnrollment'
import { DbStudent } from '../shared/db/DbStudent'
import { DbTeacher } from '../shared/db/DbTeacher'

export class Global {
    static db: Db

    static async initDb(logger?: Logger) {
        const uri = process.env.MONGODB_ATLAS_URI as string
        logger?.log('Connecting to db...')
        const client = await new MongoClient(uri).connect()
        logger?.log('... db connection successful')
        this.db = client.db()
    }

    static collection<T extends keyof DbCollectionType>(col: T): Collection<OptionalId<DbCollectionType[T]>> {
        return this.db.collection(col)
    }
}

export interface DbCollectionType {
    // put models/collections here
    // e.g User, Course etc..
    Student: DbStudent;
    Teacher: DbTeacher;
    Course: DbCourse;
    Class: DbClass;
    Enrollment: DbEnrollment;
    Campus: DbCampus;
}
