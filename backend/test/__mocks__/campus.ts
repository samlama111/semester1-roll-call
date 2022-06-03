import { ObjectId } from 'mongodb'

import { DbCampus } from '../../src/shared/db/DbCampus'

export const validCampus: DbCampus = {
    _id: new ObjectId(),
    name: 'valid campus',
    location: {
        lat: 43.55222,
        long: -87.9617585,
    }
}
