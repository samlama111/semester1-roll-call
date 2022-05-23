import { ObjectId } from 'mongodb'

import { CourseAttendance } from '../../models/CourseAttendance'
import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqGetByClass extends BaseRequest {
    class_id: ObjectId;
}

export interface ResGetByClass extends BaseResponse {
    class_attendance: CourseAttendance[];
}

export const conf: BaseConf = {
    
}
