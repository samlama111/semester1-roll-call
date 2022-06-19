import { ObjectId } from 'mongodb'

import { DbClass } from '../../src/shared/db/DbClass'

export const validClass: DbClass = {
    _id: new ObjectId(),
    name: 'Geography'
}
