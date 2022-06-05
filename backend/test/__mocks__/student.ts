import { ObjectId } from 'mongodb'

import { DbStudent } from '../../src/shared/db/DbStudent'

export const validClass: DbStudent = {
    _id: new ObjectId(),
    uid: 'string',
    firstname: 'John',
    lastname: 'Doe',
    email: 'John@doe.dk'
}
