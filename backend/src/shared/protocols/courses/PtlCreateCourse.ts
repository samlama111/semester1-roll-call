import { ObjectId } from 'mongodb'

import { DbCourse } from '../../db/DbCourse'
import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqCreateCourse extends BaseRequest {
    name: string;
    teacher_id: string;
    class_id: ObjectId;
    campus_id: ObjectId;
}

export interface ResCreateCourse extends BaseResponse {
    course: DbCourse;
}

export const conf: BaseConf = {
    
}
