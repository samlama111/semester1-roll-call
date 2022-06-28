import { ObjectId } from 'mongodb'

import { DbEnrollment } from '../../src/shared/db/DbEnrollment'

export const validEnrollment: DbEnrollment = {
    _id: new ObjectId(),
    date: '04-20-2022',
    roll_call_started: true,
    enrolled_student_ids: ['stringstringstringstring', 'stringstringstringstrinf'],
    end_date: '04-21-2022'
}
