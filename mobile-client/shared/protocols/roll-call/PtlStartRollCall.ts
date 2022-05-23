import { ObjectId } from 'mongodb'

import { DbEnrollment } from '../../db/DbEnrollment'
import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqStartRollCall extends BaseRequest {
    course_id: ObjectId;
}

export interface ResStartRollCall extends BaseResponse {
    roll_call: DbEnrollment;
}

export const conf: BaseConf = {
    
}
