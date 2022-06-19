import { ObjectId } from 'mongodb'

import { DbCourse } from '../../db/DbCourse'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqGetCourses extends BaseRequest {
    class_id?: ObjectId;
}

export interface ResGetCourses extends BaseResponse {
    courses: DbCourse[];
}
