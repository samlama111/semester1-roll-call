import { ObjectId } from 'mongodb'

import { DbCourse } from '../../db/DbCourse'
import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqGetRollCall extends BaseRequest {
}

export interface ResGetRollCall extends BaseResponse {
    course_info: Partial<DbCourse>;
    roll_call_id: ObjectId;
    is_student_enrolled: boolean;
}

export const conf: BaseConf = {
    
}
