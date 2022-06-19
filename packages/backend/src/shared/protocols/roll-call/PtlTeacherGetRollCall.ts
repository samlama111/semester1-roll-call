import { ObjectId } from 'mongodb'

import { DbEnrollment } from '../../db/DbEnrollment'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqTeacherGetRollCall extends BaseRequest {
    course_id: ObjectId;
}

export interface ResTeacherGetRollCall extends BaseResponse {
    enrollment_info: DbEnrollment;
}
