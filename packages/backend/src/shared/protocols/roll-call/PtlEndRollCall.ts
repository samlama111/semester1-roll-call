import { ObjectId } from 'mongodb'

import { DbEnrollment } from '../../db/DbEnrollment'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqEndRollCall extends BaseRequest {
    enrollment_id: ObjectId;
    course_id: ObjectId;
}

export interface ResEndRollCall extends BaseResponse {
    enrollment: DbEnrollment;
}
