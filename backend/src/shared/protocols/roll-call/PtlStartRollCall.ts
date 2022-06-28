import { ObjectId } from 'mongodb'

import { DbEnrollment } from '../../db/DbEnrollment'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqStartRollCall extends BaseRequest {
    course_id: ObjectId;
    enrollment_duration: number;
}

export interface ResStartRollCall extends BaseResponse {
    roll_call: DbEnrollment;
}
