import { ObjectId } from 'mongodb'

import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqStartRollCall extends BaseRequest {
    course_id: ObjectId;
    class_id: ObjectId;
}

export interface ResStartRollCall extends BaseResponse {
    message: string
}

export const conf: BaseConf = {
    
}
