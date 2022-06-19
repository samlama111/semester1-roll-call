import { ObjectId } from 'mongodb'

import { DbStudent } from '../../src/shared/db/DbStudent'

export const validStudent: DbStudent = {
    _id: new ObjectId(),
    uid: 'string',
    firstname: 'John',
    lastname: 'Doe',
    email: 'John@doe.dk'
}
